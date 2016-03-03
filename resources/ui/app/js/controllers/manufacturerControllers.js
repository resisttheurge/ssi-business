'use strict'
var manufacturerControllers = angular.module('manufacturerControllers', [])

manufacturerControllers.controller('ManufacturerListController', [
  '$scope', 'Manufacturer', '$filter', '$q',
  function($scope, Manufacturer, $filter, $q){
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.onPaginate = function (page, limit) {
      return getManufacturers(angular.extend({}, $scope.query, {page: page, limit: limit}))
    }

    $scope.onReorder = function (order) {
      return getManufacturers(angular.extend({}, $scope.query, {order: order}))
    }

    function getManufacturers(query) {
      return $scope.promise =
        Manufacturer.endpoint.query().$promise
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

    function store(manufacturers) {
      return $scope.manufacturers = manufacturers
    }

    getManufacturers($scope.query)
  }
])

manufacturerControllers.controller('ManufacturerDetailController', ['$scope', '$routeParams', 'Manufacturer',
  function($scope, $routeParams, Manufacturer) {
    Manufacturer.endpoint.get({manufacturerId: $routeParams.manufacturerId}, function(response){
      $scope.loading = true
      if(response.success) {
        $scope.manufacturer = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
