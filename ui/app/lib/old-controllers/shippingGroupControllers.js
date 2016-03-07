var shippingGroupControllers = angular.module('shippingGroupControllers', [])

shippingGroupControllers.controller('ShippingGroupListController', [
  '$scope', 'ShippingGroupByJob', '$filter', '$q', '$routeParams', 'selectionService',
  function($scope, ShippingGroupByJob, $filter, $q, $routeParams, selectionService){
    $scope.selected = selectionService.selected
    $scope.selectShippingGroup = selectionService.selectShippingGroup
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.onPaginate = function (page, limit) {
      return getShippingGroups(angular.extend({}, $scope.query, {page: page, limit: limit}))
    }

    $scope.onReorder = function (order) {
      return getShippingGroups(angular.extend({}, $scope.query, {order: order}))
    }

    function getShippingGroups(query) {
      return $scope.promise =
        ShippingGroupByJob.endpoint.query($routeParams).$promise
          .then(unpackResponse)
          .then(total)
          .then(sort(query))
          .then(page(query))
          .then(store)
    }

    function unpackResponse(response) {
      return $q(function(resolve, reject) {
        if(response) {
          if(response.success) {
            return resolve(response.data)
          } else {
            return reject(response.message ? response.message : 'API response failed')
          }
        } else {
          return reject('API response was undefined')
        }
      })
    }

    function total(array) {
      $scope.total = array.length
      return array
    }

    function sort(query) {
      return function(array) {
        return orderBy(array, query.order)
      }
    }

    function page(query) {
      var end = query.page * query.limit
        , begin = end - query.limit
      return function(array) {
        return array.slice(begin, end)
      }
    }

    function store(shippingGroups) {
      return $scope.shippingGroups = shippingGroups
    }

    getShippingGroups($scope.query)
  }
])

shippingGroupControllers.controller('ShippingGroupDetailController', ['$scope', '$routeParams', 'ShippingGroup',
  function($scope, $routeParams, ShippingGroup) {
    $scope.loading = true
    ShippingGroup.endpoint.get($routeParams, function(response){
      if(response.success) {
        $scope.shippingGroup = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
