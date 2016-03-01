import angular from 'angular'

export default
  angular.module('shipmentControllers', [])

    .controller('ShipmentListController', ['$scope', '$stateParams', 'selectionService', 'ShipmentByJob',
      function($scope, $stateParams, selectionService, ShipmentByJob) {
        $scope.loading = true
        $scope.selected = selectionService.selected
        $scope.selectShipment = selectionService.selectShipment
        ShipmentByJob.query($stateParams, function(response) {
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

    .controller('ShipmentDetailController', ['$scope', '$stateParams', 'Shipment',
      function($scope, $stateParams, Shipment) {
        $scope.loading = true
        Shipment.get({shipmentId: $stateParams.shipmentId}, function(response){
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

    .name
