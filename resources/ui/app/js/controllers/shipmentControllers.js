'use strict'
var shipmentControllers = angular.module('shipmentControllers', [])

shipmentControllers.controller('ShipmentListController', ['$scope', 'Shipment',
  function($scope, Shipment) {
    // console.log('getting the ShippingGroupDetail');
    Shipment.query(function(response) {
      $scope.loading = true
      console.log('this is the shipments: ' + JSON.stringify(response))
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
    // console.log('getting the ShippingGroupDetail');
    Shipment.get({shipmentId: $routeParams.shipmentId}, function(response){
      $scope.loading = true
      console.log('this is the shipment: ' + JSON.stringify(response))
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
