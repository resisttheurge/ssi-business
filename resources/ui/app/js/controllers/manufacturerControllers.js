'use strict'
var manufacturerControllers = angular.module('manufacturerControllers', [])

// ShipmentItemByShipment??
manufacturerControllers.controller('ManufacturerListController', ['$scope', 'Manufacturer',
  function($scope, Manufacturer) {
    $scope.loading = true
    Manufacturer.query(function(response) {

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
    Manufacturer.get({manufacturerId: $routeParams.manufacturerId}, function(response){
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
