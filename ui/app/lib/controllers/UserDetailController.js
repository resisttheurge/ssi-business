import { DetailController } from 'utils'

export default class UserDetailController extends DetailController {
  /*@ngInject*/
  constructor(
    $scope, $routeParams, User, enums, $mdDialog, $route, $location, $q
  ) {
    super()

    $scope.userRoleTypes = enums.userRoleTypes
    $scope.user = {  };
    $scope.user.adminSelected = false;
    $scope.user.active = true;

    $scope.hasRole = role =>
      $scope.user ?
        $scope.user.roles ?
          $scope.user.roles.indexOf(role) !== -1
        : false
      : false

    if ($routeParams.userId) {
      this.refresh = () =>
        $q.resolve($scope.loading = true)
          .then(() => User.get($routeParams.userId))
          .then(user => $scope.user = user)
          .then(() => $scope.user.adminSelected = $scope.hasRole('ADMIN'))
          .then(() => $scope.loading = false)

      $scope.update = function update(item) {

        if (item.adminSelected) {
          item.roles = ['ADMIN']
        } else {
          item.roles = ['EMPLOYEE']
        }

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

      this.refresh()

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
