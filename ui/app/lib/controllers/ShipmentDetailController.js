import { DetailController } from 'utils'

export default class ShipmentDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, Shipment, enums, $ssiSelected, $mdDialog) {
    super()

    $scope.shipmentStatuses = enums.shipmentStatuses

    $scope.loading = true

    $scope.job = $ssiSelected.job;
    $scope.shipment = $ssiSelected.shipment;

    Shipment.endpoint.get({ shipmentId: $routeParams.shipmentId }, function (response) {
      if (response.success) {
        $scope.shipment = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })

    $scope.update = function update(item)
    {
      Shipment.update(item).then(function (data) { $mdDialog
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
