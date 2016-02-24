'use strict'
var manufacturerControllers = angular.module('manufacturerControllers', [])

// ShipmentItemByShipment??
manufacturerControllers.controller('ManufacturerListController', ['$scope', 'Manufacturer',
  function($scope, Manufacturer) {
    // console.log('getting the ShippingGroupDetail');
    Manufacturer.query(function(response) {
      $scope.loading = true
      console.log('this is the manufacturers: ' + JSON.stringify(response))
      if(response.success) {
        $scope.manufacturers = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])

manufacturerControllers.controller('ManufacturerDetailController', ['$scope', '$routeParams', 'Manufacturer',
  function($scope, $routeParams, Manufacturer) {
    // console.log('getting the ShippingGroupDetail');
    Manufacturer.get({manufacturerId: $routeParams.manufacturerId}, function(response){
      $scope.loading = true
      console.log('this is the manufacturerId: ' + JSON.stringify(response))
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
