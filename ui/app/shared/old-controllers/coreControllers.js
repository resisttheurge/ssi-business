import angular from 'angular'
import ngMaterial from 'angular-material'

export default
  angular.module('coreControllers', [ngMaterial])
    .controller(
      'RootController',
      [
        '$scope',
        '$state',
        '$mdSidenav',
        '$mdMedia',
        '$user',
        'selectionService',
        function (
          $scope,
          $state,
          $mdSidenav,
          $mdMedia,
          $user,
          selectionService
        ) {

          // grab the user and logout function
          $scope.user = $user
          $scope.logout = function() {
            $user.logout()
            $state.go('login')
          }

          $scope.selected = selectionService.selected

          $scope.isUserLoggedIn = $user.isLoggedIn

          $scope.isNavLockedOpen = function() {
            return $scope.user.isLoggedIn() && $mdMedia('gt-sm')
          }

          // set up sidenav toggling
          $scope.toggleSidenav = function() {
            $mdSidenav('sidenav').toggle()
          }

        }
      ]
    )
    .name
