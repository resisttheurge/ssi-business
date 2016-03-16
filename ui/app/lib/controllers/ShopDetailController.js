import { DetailController } from 'utils'

export default class ShopDetailController extends DetailController {
  /*@ngInject*/
  constructor($mdDialog, $scope, $routeParams, Shop) {
    super()
    if ($routeParams.shopId) {

      Shop.endpoint.get({ shopId: $routeParams.shopId },
        function (response) {
          $scope.loading = true
          if (response.success) {
            $scope.shop = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }

          $scope.loading = false
        }
      )
      $scope.update = function update(item) {
        Shop.update(item).then(
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
        Shop.create(item).then(
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
