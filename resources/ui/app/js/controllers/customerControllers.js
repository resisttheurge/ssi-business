'use strict'

var customerControllers = angular.module('customerControllers', [])

customerControllers.controller('CustomerListController', ['$scope', '$routeParams', 'Customer',
  function($scope, $routeParams, Customer){
    $scope.loading = true
    Customer.query(function(response) {

      if(response.success) {
        $scope.customers = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])

customerControllers.controller('CustomerDetailController', ['$scope', '$routeParams', 'Customer',
  function($scope, $routeParams, Customer){
    Customer.get({customerId: $routeParams.customerId}, function(response){
      $scope.loading = true;
      if(response.success) {
        $scope.customer = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
