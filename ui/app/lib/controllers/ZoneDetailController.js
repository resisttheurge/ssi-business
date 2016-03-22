import { DetailController } from 'utils'

export default class ZoneDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, Zone, $mdDialog, $ssiSelected, $convertDate) {
    super()
    $scope.loading = true
    $scope.job = $ssiSelected.job;
    $scope.zone = $ssiSelected.zone;

    Zone.endpoint.get($routeParams, function (response) {
      if (response.success) {
        $scope.zone = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })

    if ($scope.zone != null) {
      $scope.fieldDateDisplay = $scope.zone.fieldDate != null ?
        $convertDate.stringToDate($scope.zone.fieldDate) : undefined
    } else {
      $scope.fieldDateDisplay = undefined
    }

    $scope.update = function update(item)
    {
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
    }

  }
}
