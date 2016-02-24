'use strict'

var vendorControllers = angular.module('vendorControllers', [])

vendorControllers.controller('VendorListController', ['$scope', 'Vendor',
  function($scope, Vendor) {
    // console.log('getting the ShippingGroupDetail');
    Vendor.query(function(response) {
      $scope.loading = true
      console.log('this is the vendors: ' + JSON.stringify(response))
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
    // console.log('getting the ShippingGroupDetail');
    Vendor.get({vendorId: $routeParams.vendorId}, function(response){
      $scope.loading = true
      console.log('this is the vendor: ' + JSON.stringify(response))
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
