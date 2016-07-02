import { DetailController } from 'utils'

export default class MarkDetailController extends DetailController {
  /*@ngInject*/
  constructor(
    $q, Shop, $scope, $routeParams, Mark, enums, $ssiSelected, $mdDialog, $log,
    $location, $route, ShippingItemZone, $mdToast
  ) {
    super()

    $scope.shippingItemStatuses = enums.shippingItemStatuses
    $scope.drawing = $ssiSelected.drawing;
    $scope.job = $ssiSelected.job;
    $scope.$shippingItemZone = ShippingItemZone;
    $scope.$ssiSelected = $ssiSelected;

    $scope.loading = true

    $scope.delete = item =>
      $mdDialog.show(
        $mdDialog.confirm()
          .title(`Are you sure?`)
          .textContent(`Are you sure you want to delete mark information for zone ${item.zone.number}?`)
          .ok('ok')
          .cancel('cancel')
      )
      .then(() => ShippingItemZone.delete(item))
      .then(
        () =>
          $mdToast.show(
            $mdToast.simple()
              .textContent(`Deleted mark information for zone ${item.zone.number}`)
              .position('bottom right')
          )
          .then(() => $route.reload()),
        reason => $mdToast.show(
          $mdToast.simple()
            .textContent(`Could not delete mark information for zone ${item.zone.number} because ${reason}`)
            .position('bottom right')
          )
      )

    if ($routeParams.markId) {

      this.refresh = () =>
        $q.all({
          mark: Mark.get($routeParams.markId),
          shops: Shop.list()
        }).then(
          ({ mark, shops }) => {
            $scope.mark = mark
            $scope.zones = mark.shippingItemZones
            $scope.shops = shops
          }
        ).then(() => $scope.loading = false)

      $scope.update = function update(item)
      {
        if (
          item.drawingId &&
          item.label &&
          item.shippingItem &&
          item.shippingItem.status &&
          item.shippingItem.requested !== undefined &&
          item.shippingItem.completed !== undefined
        ) {
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

      this.refresh()

    } else {
      this.refresh = () =>
        $q.all({
          shops: Shop.list()
        }).then(
          ({ shops }) => {
            $scope.shops = shops
          }
        ).then(() => $scope.loading = false)

      $scope.mark = { drawingId: $ssiSelected.drawing.id, shippingItem: { status: 'NS', requested: 0, completed: 0 } }

      $scope.create = mark =>
      {
        if (
          mark.drawingId &&
          mark.label &&
          mark.shippingItem &&
          mark.shippingItem.status &&
          mark.shippingItem.requested !== undefined &&
          mark.shippingItem.completed !== undefined
        ) {
          Mark.create(mark)
          .then(
            data =>
              $mdDialog.show(
                $mdDialog.alert()
                  .title('Record created!')
                  .textContent('This record has been saved to the database')
                  .ok('Close')
              ).then(() => $location.path(`/jobs/${$ssiSelected.job.id}/drawings/${$ssiSelected.drawing.id}/marks/${data.id}`)),
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
    $log.info('scope ::: ', $scope);
    $log.info('mark ::: ',$scope.mark);
    //if(!$scope.mark.id){
    //  $scope.mark.shippingItem.shop = { id : 1, label: 'MEM' };
    //}
  }
}
