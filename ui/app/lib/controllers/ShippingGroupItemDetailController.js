import { DetailController } from 'utils'

export default class ShippingGroupItemDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, ShippingGroupItem, enums, $mdDialog, $ssiSelected) {
    super()

    $scope.shippingItemStatuses = enums.shippingItemStatuses
    $scope.loading = true
    $scope.shippingGroup = $ssiSelected.shippingGroup

    ShippingGroupItem.endpoint.get($routeParams,
      function (response) {
        if (response.success) {
          $scope.shippingGroupItem = response.data
        } else {
          $scope.error = true
          $scope.message = response.message
        }

        $scope.loading = false
      }
    )

    $scope.update = function update(item)
    {
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
    }
  }
}
