import { DetailController } from 'utils'

export default class MarkZoneDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams,
    Zone, ShippingItemZone, ShippingItemZoneByShippingItem, $mdDialog, $ssiSelected, $convertDate) {
    super()

    $scope.job = $ssiSelected.job

    this.refresh = () =>
      Zone.get($routeParams.zoneId)
        .then(zone => $scope.zone = zone)
        .then(() => $scope.loading = false)

    if ($routeParams.zoneId) {
      $scope.loading = true
      $scope.update = function update(item)
      {
        if (item.number) {
          Zone.update(item).then(function (data) { $mdDialog
            .show($mdDialog.alert()
            .title('Changes Saved!')
            .textContent('Changes to this record have been saved')
            .ok('Close'));
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
      $scope.zone = { jobId: $scope.job.id }

      $scope.create = zone => {
        if (zone.number) {
          Zone.create(zone)
          .then(
            data =>
              $mdDialog.show(
                $mdDialog.alert()
                  .title('Record created!')
                  .textContent('This record has been saved to the database')
                  .ok('Close')
              ).then(() => $location.url(`/zones/${data.id}`)),
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
    }

  }
}
