import angular from 'angular'

export default class LoginController {

  constructor($state, $mdToast, $user) {

    this.reset()

    this.login = (user) => {
      console.log('logging in user ' + JSON.stringify(user))
      $user.login(user.username, user.password, ($user) => {
        if($user.didLastLoginFail()) {
          $mdToast.show(
            $mdToast.simple()
              .textContent(response.message)
              .action('OK')
              .highlightAction(false)
              .position('bottom right')
          )
        } else {
          $state.go('home')
        }
      })
      this.reset()
    }

  }

  reset() {
    this.user = {
      username: '',
      password: ''
    }
  }

}
