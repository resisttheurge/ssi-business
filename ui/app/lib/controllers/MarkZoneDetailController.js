import { DetailController } from 'utils'

export default class MarkZoneDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams,
    Zone, ShippingItemZone, ShippingItemZoneByShippingItem, $mdDialog,
    $ssiSelected, $convertDate, $q, ZoneByJob
  ) {
    super()

    $scope.job = $ssiSelected.job

    if ($routeParams.shippingItemZoneId) {
      this.refresh = () =>
        $q.all({
          shippingItemZone: ShippingItemZone.get($routeParams.shippingItemZoneId),
          zones: ZoneByJob.list($ssiSelected.job.id)
        }).then(({ shippingItemZone, zones }) => {
          $scope.shippingItemZone = shippingItemZone
          $scope.zones = zones
        }).then(() => $scope.loading = false)

      $scope.loading = true
      $scope.update = function update(shippingItemZone)
      {
        if (
          shippingItemZone.shippingItemId &&
          shippingItemZone.zone &&
          shippingItemZone.quantity
        ) {
          ShippingItemZone.update(shippingItemZone).then(function (data) { $mdDialog
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
          zones: ZoneByJob.list($ssiSelected.job.id)
        }).then(({ shippingItemZone, zones }) => {
          $scope.zones = zones
        }).then(() => $scope.loading = false)

      $scope.shippingItemZone = { shippingItemId: $ssiSelected.mark.shippingItem.id, quantity: 0 }

      $scope.create = shippingItemZone => {
        if (
          shippingItemZone.shippingItemId &&
          shippingItemZone.zone &&
          shippingItemZone.quantity
        ) {
          ShippingItemZone.create(shippingItemZone)
          .then(
            data =>
              $mdDialog.show(
                $mdDialog.alert()
                  .title('Record created!')
                  .textContent('This record has been saved to the database')
                  .ok('Close')
              ).then(() => $location.path(`/jobs/${$ssiSelected.job.id}/drawings/${$ssiSelected.drawing.id}/marks/${$ssiSelected.mark.id}/zones/${data.id}`)),
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
          $mdDialog
           .show($mdDialog.alert()
           .title('Failed to Save')
           .textContent('Invalid data')
         .ok('Close'))
        }
      }

      this.refresh()
    }

  }
}
