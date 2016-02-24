var shipmentItemControllers = angular.module('shipmentItemControllers', [])


// ShipmentItemByShipment??
shipmentItemControllers.controller('ShipmentItemListController', ['$scope', 'ShipmentItem',
  function($scope, ShipmentItem) {
    // console.log('getting the ShippingGroupDetail');
    ShipmentItem.query(function(response) {
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

shipmentItemControllers.controller('ShipmentItemDetailController', ['$scope', '$routeParams', 'ShipmentItem',
  function($scope, $routeParams, ShipmentItem) {
    // console.log('getting the ShippingGroupDetail');
    ShipmentItem.get({shipmentItemId: $routeParams.shipmentItemId}, function(response){
      $scope.loading = true
      console.log('this is the shipmentItem: ' + JSON.stringify(response))
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
