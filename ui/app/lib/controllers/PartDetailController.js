import { DetailController } from 'utils'

export default class PartDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, Part, enums, $ssiSelected, $mdDialog) {
    super()

    $scope.partTypes = enums.partTypes

    $scope.job = $ssiSelected.job;

    Part.endpoint.get({ partId: $routeParams.partId }, function (response) {
      $scope.loading = true
      if (response.success) {
        $scope.part = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })

    $scope.update = function update(item)
    {
      Part.update(item).then(function (data) { $mdDialog
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
