export default class LoginController {
  constructor($scope, $location, $mdToast, userService, AuthService) {
    $scope.user = {
      username: '',
      password: ''
    }

    $scope.reset = function () {
      $scope.user.username = ''
      $scope.user.password = ''
    }

    $scope.login = function (user) {
      AuthService.endpoint.login(angular.copy(user), function (response) {
        if (response.success) {
          userService.user.isLoggedIn = true
          userService.user.username = response.data.username
          userService.user.roles = response.data.roles
          $location.path('/home')
        } else {
          $mdToast.show(
            $mdToast.simple()
              .textContent(response.message)
              .action('OK')
              .highlightAction(false)
              .position('bottom right')
          )
        }
      })

      $scope.reset()
    }
  }
}
