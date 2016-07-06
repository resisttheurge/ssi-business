import { AbstractController } from 'utils'

export default class LoginController extends AbstractController {

  /*@ngInject*/
  constructor($location, $mdToast, $ssiUser, $ssiAuth, $scope) {
    super()

    this.user = {
      username: '',
      password: ''
    }

    this.login = () =>
      $ssiUser.login(angular.copy(this.user))
        .then(() => {
          if (this.user.password === 'RESET')
          {
            this.resetPassword = true;
            $ssiUser.navDisabled = true;
          }

          this.reset()
        })
        .then(() =>
        {
          if (this.resetPassword)
          {
            $location.path('/resetPassword')
          } else
          {
            $location.path('/jobs')
          }
        }
        ).catch(reason =>
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
