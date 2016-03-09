export default class ShipmentDetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, Shipment) {
    $scope.loading = true
    Shipment.endpoint.get({ shipmentId: $routeParams.shipmentId }, function (response) {
      if (response.success) {
        $scope.shipment = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })
  }
}
