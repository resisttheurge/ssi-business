import { DetailController } from 'utils'

export default class ShipmentDetailController extends DetailController {
  /*@ngInject*/
  constructor($q, $scope, $routeParams, Shipment, enums, $ssiSelected, $mdDialog,
    $convertDate, $log, Shop, Carrier, $location, $route
  ) {
    super()

    $scope.shipmentStatuses = enums.shipmentStatuses

    $scope.job = $ssiSelected.job
    $scope.loading = true

    $scope.addAddressLine = () =>
      $scope.shipment ?
        $scope.shipment.address ?
          $scope.shipment.address.lines ?
            $scope.shipment.address.lines = [
              ...$scope.shipment.address.lines,
              {
                id: $scope.shipment.address.lines.length,
                value: ''
              }]
          : $scope.shipment.address.lines = [{ id: 0, value: '' }]
        : $scope.shipment.address = { lines: [{ id: 0, value: '' }] }
      : $scope.shipment = { address: { lines: [{ id: 0, value: '' }] } }

    if ($routeParams.shipmentId) {

      this.refresh = () =>
        $q.all({
          shipment: Shipment.get($routeParams.shipmentId),
          shops: Shop.list(),
          carriers: Carrier.list()
        }).then(
          ({ shipment, shops, carriers }) => {
            $scope.shipment = shipment
            $scope.shops = shops
            $scope.carriers = carriers
          }
        ).then(() => $scope.loading = false)

      $scope.loading = true

      $scope.update = function update(item)
      {
        if (
          item.jobId &&
          item.weight !== undefined &&
          item.status &&
          item.number !== undefined
        ) {
          Shipment.update(item).then(function (data) { $mdDialog
            .show($mdDialog.alert()
            .title('Changes Saved!')
            .textContent('Changes to this record have been saved')
            .ok('Close')).then(() => $route.reload());
          }, function (error) { $mdDialog
            .show($mdDialog.alert()
            .title('Failed to Save')
            .textContent('There has been an error, changes have not been saved')
          .ok('Close'))});
        } else {
          $mdDialog
           .show($mdDialog.alert()
           .title('Failed to Save')
           .textContent('Invalid data')
         .ok('Close'))
        }
      }

      this.refresh()
    } else {
      this.refresh = () =>
        $q.all({
          shops: Shop.list(),
          carriers: Carrier.list()
        }).then(
          ({ shops, carriers }) => {
            $scope.shops = shops
            $scope.carriers = carriers
          }
        ).then(() => $scope.loading = false)

      $scope.shipment = { jobId: $scope.job.id, status: 'ACTIVE', weight: 0, address: { lines: [{ id: 0, value: '' }] } }

      $scope.create = shipment => {
        if (
          shipment.jobId &&
          shipment.weight !== undefined &&
          shipment.status &&
          shipment.number !== undefined
        ) {
          Shipment.create(shipment).then(
            data =>
              $mdDialog.show(
                $mdDialog.alert()
                  .title('Record created!')
                  .textContent('This record has been saved to the database')
                  .ok('Close')
              ).then(() => $location.path(`/jobs/${$ssiSelected.job.id}/shipments/${data.id}`)),
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
        } else {
          $mdDialog.show(
            $mdDialog.alert()
             .title('Failed to Save')
             .textContent('Invalid data')
            .ok('Close')
          )
        }
      }

      this.refresh()
    }
  }
}
