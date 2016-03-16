import { DetailController } from 'utils'

export default class VendorDetailController extends DetailController {
  /*@ngInject*/
  constructor($mdDialog, $scope, $routeParams, Vendor) {
    super()
    if ($routeParams.vendorId) {
      Vendor.endpoint.get({ vendorId: $routeParams.vendorId }, function (response) {
        $scope.loading = true
        if (response.success) {
          $scope.vendor = response.data
        } else {
          $scope.error = true
          $scope.message = response.message
        }

        $scope.loading = false
      })

      $scope.update = function update(item) {
        Vendor.update(item).then(
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
    } else {
      $scope.create = item =>
        Vendor.create(item).then(
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
