import { DetailController } from 'utils'

export default class ShippingGroupItemDetailController extends DetailController {
  /*@ngInject*/
  constructor($q, $scope, $routeParams, ShippingGroupItem, ShippingItemZoneByShippingItem,
     enums, $mdDialog, $ssiSelected, Shop, ShippingItemZone) {
    super()

    $scope.shippingItemStatuses = enums.shippingItemStatuses
    $scope.shippingGroup = $ssiSelected.shippingGroup;
    $scope.job = $ssiSelected.job;
    $scope.$shippingItemZone = ShippingItemZone;
    $scope.$ssiSelected = $ssiSelected;

    ShippingGroupItem.get($routeParams.shippingGroupItemId).then(
      function (response) {
        $scope.loading = true
        $scope.shippingGroupItem = response
        $scope.zones = response.shippingItemZones
        $scope.loading = false
      }
    )

    $scope.refresh = () =>
      $q.all({
        shippingGroupItem: ShippingGroupItem.get($routeParams.shippingGroupItemId),
        shops: Shop.list()
      }).then(
        ({ shippingGroupItem, shops }) => {
          $scope.shippingGroupItem = shippingGroupItem
          $scope.shops = shops
        }
      ).then(() => $scope.loading = false)

    if ($routeParams.shippingGroupItemId) {

      $scope.update = function update(item)
      {
        if (item.label) {
          ShippingGroupItem.update(item).then(function (data) { $mdDialog
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

      $scope.refresh()

    } else {
      $scope.create = item =>

        // ShippingGroupItem.create(item).then(
        //   data =>
        //     $mdDialog.show(
        //       $mdDialog.alert()
        //         .title('Record created!')
        //         .textContent('This record has been saved to the database')
        //         .ok('Close')
        //     ),
        //   error =>
        //     $mdDialog.show(
        //       $mdDialog.alert()
        //         .title('Failed to create record')
        //         .textContent('There has been an error, record could not be created')
        //         .ok('Close')
        //     )
        // )
        {
          {
            shippingGroupItem.shippingGroupId = $ssiSelected.shippingGroup.id;
            ShippingGroupItem.create(shippingGroupItem)
            .then(
              item =>
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
