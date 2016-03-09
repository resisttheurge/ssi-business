export default class LoginController {

  /*@ngInject*/
  constructor($location, $mdToast, $ssiUser, $ssiAuth) {
    this.user = {
      username: '',
      password: ''
    }

    this.login = () =>
      $ssiUser.login(angular.copy(this.user))
        .then(() => this.reset())
        .then(() => $location.path('/jobs'))
        .catch(reason =>
          $mdToast.show(
            $mdToast.simple()
              .textContent(reason)
              .action('OK')
              .highlightAction(false)
              .position('bottom right')
          )
        )
  }

  get disabled() {
    return (this.user.username.length <= 0) || (this.user.password.length <= 0)
  }

  reset() {
    this.user.username = ''
    this.user.password = ''
  }
}
