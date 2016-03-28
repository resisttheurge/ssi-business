import { DetailController } from 'utils'

export default class ShipmentItemDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, ShipmentItem, ShippingItemByJob, enums, $mdDialog, $ssiSelected, $log, $location) {
    super()

    $scope.shippingItemStatuses = enums.shippingItemStatuses
    $scope.loading = true

    $scope.shipment = $ssiSelected.shipment
    $scope.job = $ssiSelected.job
    ShippingItemByJob.list($scope.job.id).then(collection => $scope.shippingItemCollection = collection);

    var self = this;

    this.refresh = () =>
      ShipmentItem.get($routeParams.shipmentItemId)
        .then(shipmentItem => $scope.shipmentItem = shipmentItem)
        .then(() => $scope.loading = false)

    if ($routeParams.shipmentItemId) {
      $scope.loading = true
      $scope.update = function update(item)
      {
        $scope.loading = true;
        ShipmentItem.update(item).then(function (data) { $mdDialog
          .show($mdDialog.alert()
          .title('Changes Saved!')
          .textContent('Changes to this record have been saved')
          .ok('Close'));
        }, function (error) { $mdDialog
          .show($mdDialog.alert()
          .title('Failed to Save')
          .textContent('There has been an error, changes have not been saved')
        .ok('Close'))}).finally(() => self.refresh());
      }

      this.refresh()
    } else {
      $scope.loading = false
      $scope.shipmentItem = { shipmentId: $scope.shipment.id }

      $scope.create = shipmentItem => {
        ShipmentItem.create(shipmentItem)
        .then(
          data =>
            $mdDialog.show(
              $mdDialog.alert()
                .title('Record created!')
                .textContent('This record has been saved to the database')
                .ok('Close')
            ).then(() => $location.url(`/job/${$ssiSelected.job.id}/shipments/${$ssiSelected.shipment.id}/item/${data.id}`)),
            error => {
              $log.error(JSON.stringify(error))
              $mdDialog.show(
                $mdDialog.alert()
                  .title('Failed to create record')
                  .textContent('There has been an error, record could not be created')
                  .ok('Close')
              )
            }
          )
      }
    }

  }
}
