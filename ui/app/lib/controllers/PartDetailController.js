import { DetailController } from 'utils'

export default class PartDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, Part, enums, $ssiSelected, $mdDialog) {
    super()

    $scope.partTypes = enums.partTypes

    $scope.job = $ssiSelected.job;

    if ($routeParams.partId) {
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

      $scope.update = function update(item) {
        if (item.number) {
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
        } else {
          $mdDialog
           .show($mdDialog.alert()
           .title('Failed to Save')
           .textContent('Invalid data')
         .ok('Close'))
        }
      }

    } else {
      $scope.create = item =>
        Part.create(item).then(
          data =>
            $mdDialog.show(
              $mdDialog.alert()
                .title('Record created!')
                .textContent('This record has been saved to the database')
                .ok('Close')
            ),
          error =>
            $mdDialog.show(
              $mdDialog.alert()
                .title('Failed to create record')
                .textContent('There has been an error, record could not be created')
                .ok('Close')
            )
        )
    }

  }
}
