import { DetailController } from 'utils'

export default class MarkDetailController extends DetailController {
  /*@ngInject*/
  constructor($q, Shop, $scope, $routeParams, Mark,
    ShippingItemZone, ShippingItemZoneByShippingItem, enums, $ssiSelected, $mdDialog, $log) {
    super()

    $scope.shippingItemStatuses = enums.shippingItemStatuses
    $scope.drawing = $ssiSelected.drawing;
    $scope.job = $ssiSelected.job;
    $scope.$shippingItemZone = ShippingItemZone;
    $scope.$ssiSelected = $ssiSelected;

    Mark.get($routeParams.markId).then(
      function (response) {
        $scope.loading = true
        $scope.mark = response
        $scope.zones = response.shippingItemZones
        $scope.loading = false
      }
    )

    $scope.refresh = () =>
      $q.all({
        mark: Mark.get($routeParams.markId),
        shops: Shop.list()
      }).then(
        ({ mark, shops }) => {
          $scope.mark = mark
          $scope.shops = shops
        }
      ).then(() => $scope.loading = false)

    if ($routeParams.markId) {

      $scope.update = function update(item)
      {
        if (item.label) {
          Mark.update(item).then(function (data) { $mdDialog
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

      $scope.refresh()

    } else {
      // $scope.shipment = {
      //   drawingId: $scope.drawingId.id, status: 'ACTIVE', address: { lines: [{ id: 0, value: '' }] } }

      $scope.create = mark =>
    {
      {
        mark.drawingId = $ssiSelected.drawing.id;
        Mark.create(mark)
        .then(
          data =>
            $mdDialog.show(
              $mdDialog.alert()
                .title('Record created!')
                .textContent('This record has been saved to the database')
                .ok('Close')
            ).then(() => $location.url(`/jobs/${$ssiSelected.job.id}/drawings/${$ssiSelected.drawing.id}`)),
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

      $scope.refresh()
    }
  }
}
