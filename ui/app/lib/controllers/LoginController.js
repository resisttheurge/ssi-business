export default class LoginController {

  /*@ngInject*/
  constructor($location, $mdToast, $ssiUser, $ssiAuth) {
    this.$auth = $ssiAuth
    this.$location = $location

    this.user = {
      username: '',
      password: ''
    }
  }

  reset() {
    this.user.username = ''
    this.user.password = ''
  }

  login() {
    const _copy = angular.copy(this.user)
    this.$auth.endpoint
      .login(_copy).$promise
      .then(function (response) {
        if (response.success) {
          $ssiUser.authenticated = true
          $ssiUser.username = response.data.username
          $ssiUser.roles = response.data.roles
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
      .then(function () {
        this.reset()
      })
      .catch(function (reason) {
        console.log('shit.')
      })
  }
}
