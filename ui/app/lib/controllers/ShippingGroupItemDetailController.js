import { DetailController } from 'utils'

export default class ShippingGroupItemDetailController extends DetailController {
  /*@ngInject*/
  constructor(
    $q, $scope, $routeParams, ShippingGroupItem, ShippingItemZoneByShippingItem,
     enums, $mdDialog, $ssiSelected, Shop, ShippingItemZone, $route, $location,
     $log, $mdToast
   ) {
    super()

    $scope.shippingItemStatuses = enums.shippingItemStatuses
    $scope.shippingGroup = $ssiSelected.shippingGroup;
    $scope.job = $ssiSelected.job;
    $scope.$shippingItemZone = ShippingItemZone;
    $scope.$ssiSelected = $ssiSelected;

    $scope.delete = item =>
      $mdDialog.show(
        $mdDialog.confirm()
          .title(`Are you sure?`)
          .textContent(`Are you sure you want to delete shipping group item information for zone ${item.zone.number}?`)
          .ok('ok')
          .cancel('cancel')
      )
      .then(() => ShippingItemZone.delete(item))
      .then(
        () =>
          $mdToast.show(
            $mdToast.simple()
              .textContent(`Deleted shipping group item information for zone ${item.zone.number}`)
              .position('bottom right')
          )
          .then(() => $route.reload()),
        reason => $mdToast.show(
          $mdToast.simple()
            .textContent(`Could not delete shipping group item information for zone ${item.zone.number} because ${reason}`)
            .position('bottom right')
          )
      )

    if ($routeParams.shippingGroupItemId) {

      this.refresh = () =>
        $q.all({
          shippingGroupItem: ShippingGroupItem.get($routeParams.shippingGroupItemId),
          shops: Shop.list()
        }).then(
          ({ shippingGroupItem, shops }) => {
            $scope.shippingGroupItem = shippingGroupItem
            $scope.zones = shippingGroupItem.shippingItemZones
            $scope.shops = shops
          }
        ).then(() => $scope.loading = false)

      $scope.update = function update(item)
      {
        if (
          item.shippingGroupId &&
          item.label &&
          item.shippingItem &&
          item.shippingItem.status &&
          item.shippingItem.requested !== undefined &&
          item.shippingItem.completed !== undefined
        ) {
          ShippingGroupItem.update(item).then(function (data) { $mdDialog
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

      $scope.shippingGroupItem = { shippingGroupId: $ssiSelected.shippingGroup.id, shippingItem: { status: 'NS', requested: 0, completed: 0 } }

      $scope.create = item => {
        if (
          item.shippingGroupId &&
          item.label &&
          item.shippingItem &&
          item.shippingItem.status &&
          item.shippingItem.requested !== undefined &&
          item.shippingItem.completed !== undefined
        ) {
          ShippingGroupItem.create(item)
            .then(
              item =>
                $mdDialog.show(
                  $mdDialog.alert()
                    .title('Record created!')
                    .textContent('This record has been saved to the database')
                    .ok('Close')
                ).then(() => {
                $ssiSelected.shippingGroupItem = item
                $location.url(`/jobs/${$ssiSelected.job.id}/shipping-groups/${$ssiSelected.shippingGroup.id}/items/${item.id}`)
              }),
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

      if(!$scope.shippingGroupItem.shippingItem.id){
        $scope.shippingGroupItem.shippingItem.shop = { id : 1, label: 'MEM' };
      }
    }
  }
}
