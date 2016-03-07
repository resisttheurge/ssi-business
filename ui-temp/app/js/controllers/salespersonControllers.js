'use strict'

var salespersonControllers = angular.module('salespersonControllers', [])

salespersonControllers.controller('SalespersonListController',[
  '$scope', 'Salesperson', '$filter', '$q',
  function($scope, Salesperson, $filter, $q){
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.onPaginate = function (page, limit) {
      return getSalespersons(angular.extend({}, $scope.query, {page: page, limit: limit}))
    }

    $scope.onReorder = function (order) {
      return getSalespersons(angular.extend({}, $scope.query, {order: order}))
    }

    function getSalespersons(query) {
      return $scope.promise =
        Salesperson.endpoint.query().$promise
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

    function store(salespeople) {
      return $scope.salespeople = salespeople
    }

    getSalespersons($scope.query)
  }
])

salespersonControllers.controller(
  'SalespersonDetailController',
  [
      '$scope',
      '$routeParams',
      'Salesperson',
  function($scope, $routeParams, Salesperson) {
    Salesperson.endpoint.get({salespersonId: $routeParams.salespersonId}, function(response){
      $scope.loading = true
      if(response.success) {
        $scope.salesperson = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
