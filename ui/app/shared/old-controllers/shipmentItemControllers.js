import angular from 'angular'

export default
  angular.module('shipmentItemControllers', [])


    // ShipmentItemByShipment??
    .controller('ShipmentItemListController', ['$scope', '$stateParams', 'selectionService', 'ShipmentItemByShipment',
      function($scope, $stateParams, selectionService, ShipmentItemByShipment) {
        $scope.loading = true
        $scope.selected = selectionService.selected
        $scope.selectShipmentItem = selectionService.selectShipmentItem
        ShipmentItemByShipment.query($stateParams,function(response) {

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

    .controller('ShipmentItemDetailController', ['$scope', '$stateParams', 'ShipmentItem',
      function($scope, $stateParams, ShipmentItem) {
        $scope.loading = true
        ShipmentItem.get($stateParams, function(response){

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

    .name
