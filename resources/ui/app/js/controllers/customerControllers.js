'use strict'

var customerControllers = angular.module('customerControllers', [])

customerControllers.controller('CustomerListController', ['$scope', '$routeParams', 'Customer',
  function($scope, $routeParams, Customer){
    console.log('getting all Customers');
    Customer.query(function(response) {
      $scope.loading = true
      console.log('this is the customers: ' + JSON.stringify(response))
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
    console.log('getting all Customer');
    Customer.get({customerId: $routeParams.customerId}, function(response){
      $scope.loading = true;
      // console.log
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
