import { DetailController } from 'utils'

export default class UserDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, User, enums) {
    super()

    $scope.userRoleTypes = enums.userRoleTypes

    User.endpoint.get({ userId: $routeParams.userId }, function (response) {
      $scope.loading = true
      if (response.success) {
        $scope.user = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })
  }
}
