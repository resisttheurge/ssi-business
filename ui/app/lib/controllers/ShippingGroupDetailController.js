import { DetailController } from 'utils'

export default class ShippingGroupDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, ShippingGroup, enums, $ssiSelected, $mdDialog) {
    super()

    $scope.tagTypes = enums.tagTypes
    $scope.loading  = true
    $scope.job = $ssiSelected.job;
    $scope.shippingGroup = $ssiSelected.shippingGroup;

    ShippingGroup.endpoint.get($routeParams, function (response) {
      if (response.success) {
        $scope.shippingGroup = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })

    $scope.update = function update(item)
    {
      ShippingGroup.update(item).then(function (data) { $mdDialog
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
