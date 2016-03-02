'use strict'

var salespersonControllers = angular.module('salespersonControllers', [])

salespersonControllers.controller(
  'SalespersonListController',
  [
    '$scope',
     'Salesperson',
  function($scope, Salesperson) {
    $scope.loading = true
    Salesperson.query(function(response) {
      if(response.success) {
        $scope.salespeople = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])

salespersonControllers.controller(
  'SalespersonDetailController',
  [
      '$scope',
      '$routeParams',
      'Salesperson',
  function($scope, $routeParams, Salesperson) {
    Salesperson.get({salespersonId: $routeParams.salespersonId}, function(response){
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
