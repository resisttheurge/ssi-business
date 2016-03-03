var systemTypeControllers = angular.module('systemTypeControllers', [])

systemTypeControllers.controller('SystemTypeListController', [
  '$scope', 'SystemType', '$filter', '$q',
  function($scope, SystemType, $filter, $q){
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.onPaginate = function (page, limit) {
      return getSystemTypes(angular.extend({}, $scope.query, {page: page, limit: limit}))
    }

    $scope.onReorder = function (order) {
      return getSystemTypes(angular.extend({}, $scope.query, {order: order}))
    }

    function getSystemTypes(query) {
      return $scope.promise =
        SystemType.endpoint.query().$promise
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

    function store(systemTypes) {
      return $scope.systemTypes = systemTypes
    }

    getSystemTypes($scope.query)
  }
])

systemTypeControllers.controller('SystemTypeDetailController', ['$scope', '$routeParams', 'SystemType',
  function($scope, $routeParams, SystemType) {
    SystemType.endpoint.get({systemTypeId: $routeParams.systemTypeId}, function(response){
      $scope.loading = true
      if(response.success) {
        $scope.systemType = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
