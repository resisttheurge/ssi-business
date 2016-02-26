'use strict'
var shipmentControllers = angular.module('shipmentControllers', [])

shipmentControllers.controller('ShipmentListController', ['$scope', '$routeParams', 'selectionService', 'ShipmentByJob',
  function($scope, $routeParams, selectionService, ShipmentByJob) {
    $scope.loading = true
    $scope.selected = selectionService.selected
    $scope.selectShipment = selectionService.selectShipment
    ShipmentByJob.query($routeParams, function(response) {
      if(response.success) {
        $scope.shipments = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])

shipmentControllers.controller('ShipmentDetailController', ['$scope', '$routeParams', 'Shipment',
  function($scope, $routeParams, Shipment) {
    $scope.loading = true
    Shipment.get({shipmentId: $routeParams.shipmentId}, function(response){
      if(response.success) {
        $scope.shipment = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
