import { DetailController } from 'utils'

export default class CarrierDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, $mdDialog, Carrier) {
    super()
    if ($routeParams.carrierId) {
      $scope.update = function update(item) {
        Carrier.update(item).then(
          function (data) {
            $mdDialog.show(
              $mdDialog
                .alert()
                .title('Changes Saved!')
                .textContent('Changes to this record have been saved')
                .ok('Close')
            )
          }, function (error) {

            $mdDialog.show(
              $mdDialog.alert()
                .title('Failed to Save')
                .textContent('There has been an error, changes have not been saved')
                .ok('Close')
            )
          })
      }

      Carrier.endpoint.get({ carrierId: $routeParams.carrierId }, function (response) {
        $scope.loading = true;
        if (response.success) {
          $scope.carrier = response.data
        } else {
          $scope.error = true
          $scope.message = response.message
        }

        $scope.loading = false
      })
    } else {
      $scope.create = item =>
        Carrier.create(item).then(
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
