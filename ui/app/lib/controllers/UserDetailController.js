import { DetailController } from 'utils'

export default class UserDetailController extends DetailController {
  /*@ngInject*/
  constructor(
    $scope, $routeParams, User, enums, $mdDialog, $route, $location
  ) {
    super()

    $scope.userRoleTypes = enums.userRoleTypes
    $scope.user = {  };
    $scope.user.adminSelected = false;
    $scope.user.active = true;

    if ($routeParams.userId) {
      User.endpoint.get({ userId: $routeParams.userId }, function (response) {
        $scope.loading = true
        if (response.success) {
          $scope.user = response.data
          $scope.user.adminSelected = $scope.user.roles.indexOf('ADMIN') >= 0 ? true : false;
        } else {
          $scope.error = true
          $scope.message = response.message
        }

        $scope.loading = false
      })

      $scope.update = function update(item) {
        User.update(item).then(
          function (data) {
            $mdDialog.show(
              $mdDialog
                .alert()
                .title('Changes Saved!')
                .textContent('Changes to this record have been saved')
                .ok('Close')
            ).then(() => $route.reload())
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
      $scope.create = function (item) {
        item.roles = ['EMPLOYEE'];
        if (item.adminSelected)
          item.roles.push('ADMIN');
        delete item.adminSelected;
        User.create(item).then(
          data =>
            $mdDialog.show(
              $mdDialog.alert()
                .title('Record created!')
                .textContent('This record has been saved to the database')
                .ok('Close')
            ).then(() => $location.path(`/users/${data.id}`)),
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
}
