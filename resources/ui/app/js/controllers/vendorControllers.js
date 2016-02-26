'use strict'

var vendorControllers = angular.module('vendorControllers', [])

vendorControllers.controller('VendorListController', ['$scope', 'Vendor',
  function($scope, Vendor) {
    $scope.loading = true
    Vendor.query(function(response) {

      if(response.success) {
        $scope.vendors = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
    }
])

vendorControllers.controller('VendorDetailController', ['$scope', '$routeParams', 'Vendor',
  function($scope, $routeParams, Vendor) {
    Vendor.get({vendorId: $routeParams.vendorId}, function(response){
      $scope.loading = true
      if(response.success) {
        $scope.vendor = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
