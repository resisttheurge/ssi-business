import { DetailController } from 'utils'

export default class SystemTypeDetailController extends DetailController {
  /*@ngInject*/
  constructor(
    $mdDialog, $scope, $routeParams, SystemType, $route, $location
  ) {
    super()
    if ($routeParams.systemTypeId) {
      SystemType.endpoint.get({ systemTypeId: $routeParams.systemTypeId }, function (response) {
        $scope.loading = true
        if (response.success) {
          $scope.systemType = response.data
        } else {
          $scope.error = true
          $scope.message = response.message
        }

        $scope.loading = false
      })

      $scope.update = function update(item)
      {
        if (item.label) {
          SystemType.update(item).then(function (data) { $mdDialog
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
    } else {
      $scope.create = item =>
        SystemType.create(item).then(
          data =>
            $mdDialog.show(
              $mdDialog.alert()
                .title('Record created!')
                .textContent('This record has been saved to the database')
                .ok('Close')
            ).then(() => $location.path(`/system-types/${data.id}`)),
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
