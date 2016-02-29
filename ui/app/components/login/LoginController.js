import angular from 'angular'

export default class LoginController {

  constructor($state, $mdToast, userService, AuthService) {

    this.reset()

    this.authenticate = () => {
      AuthService.login(angular.copy(this.user), (response) => {
        if(response.success){
          userService.user.isLoggedIn = true
          userService.user.username = response.data.username
          userService.user.roles = response.data.roles
          $state.go('home')
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
      this.reset()
    }

  }

  resetUser() {
    this.user = {
      username: '',
      password: ''
    }
  }

}
