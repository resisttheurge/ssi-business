export default class UserDetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, User) {
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
