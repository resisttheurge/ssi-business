import { AbstractController } from 'utils'

export default class ResetController extends AbstractController {

  /*@ngInject*/
  constructor($location, $ssiUser, User, $mdDialog, $scope) {
    super()

    this.resetPassword = () =>
    {
      $ssiUser.password = $scope.newPassword;

      var userList = User.getAll().then(userList =>
        {
          var user;
          for (var i = 0; i < userList.length; i++)
          {
            if (userList[i].username === $ssiUser.username)
              user = userList[i];
          }

          user.password = $ssiUser.password;
          return user;
        }).then(user => {
          User.update(user).then(result => $mdDialog.show(
              $mdDialog
                .alert()
                .title('Password Reset Complete!')
                .textContent('Please log in with your new password')
                .ok('Finish')
            ).then(() => {
              $ssiUser.reset();
              $ssiUser.navDisabled = false;
              $location.path('/login')
            }))
        });
    }
  }
}
