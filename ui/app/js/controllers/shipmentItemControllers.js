var shipmentItemControllers = angular.module('shipmentItemControllers', [])


// ShipmentItemByShipment??
shipmentItemControllers.controller('ShipmentItemListController', ['$scope', '$routeParams', 'selectionService', 'ShipmentItemByShipment',
  function($scope, $routeParams, selectionService, ShipmentItemByShipment) {
    $scope.loading = true
    $scope.selected = selectionService.selected
    $scope.selectShipmentItem = selectionService.selectShipmentItem
    ShipmentItemByShipment.query($routeParams,function(response) {

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

shipmentItemControllers.controller('ShipmentItemDetailController', ['$scope', '$routeParams', 'ShipmentItem',
  function($scope, $routeParams, ShipmentItem) {
    $scope.loading = true
    ShipmentItem.get($routeParams, function(response){

      if(response.success) {
        $scope.shipmentItem = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
