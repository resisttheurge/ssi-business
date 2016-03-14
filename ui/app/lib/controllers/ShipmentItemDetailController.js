import { DetailController } from 'utils'

export default class ShipmentItemDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, ShipmentItem, enums) {
    super()

    $scope.shippingItemStatuses = enums.shippingItemStatuses
    $scope.loading = true
    ShipmentItem.endpoint.get($routeParams, function (response) {

      if (response.success) {
        $scope.shipmentItem = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })
  }
}
