import { DetailController } from 'utils'

export default class ShipmentItemDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, ShipmentItem, enums, $mdDialog, $ssiSelected) {
    super()

    $scope.shippingItemStatuses = enums.shippingItemStatuses
    $scope.loading = true

    $scope.shipment = $ssiSelected.shipment
    $scope.job = $ssiSelected.job

    ShipmentItem.endpoint.get($routeParams, function (response) {

      if (response.success) {
        $scope.shipmentItem = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })

    $scope.update = function update(item)
    {
      ShipmentItem.update(item).then(function (data) { $mdDialog
        .show($mdDialog.alert()
        .title('Changes Saved!')
        .textContent('Changes to this record have been saved')
        .ok('Close'));
      }, function (error) { $mdDialog
        .show($mdDialog.alert()
        .title('Failed to Save')
        .textContent('There has been an error, changes have not been saved')
      .ok('Close'))});
    }

  }
}
