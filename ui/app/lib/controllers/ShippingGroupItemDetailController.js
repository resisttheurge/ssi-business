import { DetailController } from 'utils'

export default class ShippingGroupItemDetailController extends DetailController {
  /*@ngInject*/
  constructor(
    $q, $scope, $routeParams, ShippingGroupItem, ShippingItemZoneByShippingItem,
     enums, $mdDialog, $ssiSelected, Shop, ShippingItemZone, $route, $location,
     $log
   ) {
    super()

    $scope.shippingItemStatuses = enums.shippingItemStatuses
    $scope.shippingGroup = $ssiSelected.shippingGroup;
    $scope.job = $ssiSelected.job;
    $scope.$shippingItemZone = ShippingItemZone;
    $scope.$ssiSelected = $ssiSelected;

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
          item.shippingItemlabel
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
          item.label
        ) {
          ShippingGroupItem.create(item)
            .then(
              item =>
                $mdDialog.show(
                  $mdDialog.alert()
                    .title('Record created!')
                    .textContent('This record has been saved to the database')
                    .ok('Close')
                ).then(() => $location.url(`/jobs/${$ssiSelected.job.id}/shipping-groups/${$ssiSelected.shippingGroup.id}/items/${item.id}`)),
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
