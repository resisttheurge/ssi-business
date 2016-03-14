import { DetailController } from 'utils'

export default class ShipmentDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, Shipment, enums) {
    super()

    $scope.shipmentStatuses = enums.shipmentStatuses

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
