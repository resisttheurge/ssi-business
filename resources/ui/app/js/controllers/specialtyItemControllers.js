var specialtyItemControllers = angular.module('specialtyItemControllers', [])

specialtyItemControllers.controller('SpecialtyItemListController', [
  '$scope', 'SpecialtyItem', '$filter', '$q',
  function($scope, SpecialtyItem, $filter, $q){
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.onPaginate = function (page, limit) {
      return getSpecialtyItems(angular.extend({}, $scope.query, {page: page, limit: limit}))
    }

    $scope.onReorder = function (order) {
      return getSpecialtyItems(angular.extend({}, $scope.query, {order: order}))
    }

    function getSpecialtyItems(query) {
      return $scope.promise =
        SpecialtyItem.endpoint.query().$promise
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

    function store(specialtyItems) {
      return $scope.specialtyItems = specialtyItems
    }

    getSpecialtyItems($scope.query)
  }
])

specialtyItemControllers.controller('SpecialtyItemDetailController', ['$scope', '$routeParams', 'SpecialtyItem',
  function($scope, $routeParams, SpecialtyItem) {
    SpecialtyItem.endpoint.get({specialtyItemId: $routeParams.specialtyItemId}, function(response){
      $scope.loading = true
      if(response.success) {
        $scope.specialtyItem = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
