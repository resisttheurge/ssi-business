export default class AppController {
  /*@ngInject*/
  constructor(
    $route, $routeParams, $location, $rootScope, $mdSidenav, $mdMedia,
    $ssiUser, $ssiSelected, routes
  ) {
    // grab the user and logout function
    this.user = $ssiUser
    this.logout = function () {
      $ssiUser.reset()
      $location.path('/login')
    }

    this.selected = $ssiSelected

    this.isUserLoggedIn = function () {
      return this.user.isLoggedIn
    }

    this.isNavLockedOpen = function () {
      return this.user.isLoggedIn && $mdMedia('gt-sm')
    }

    // set up sidenav toggling
    this.toggleSidenav = function () {
      $mdSidenav('sidenav').toggle()
    }

    // handle login-based access restriction
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      if (next.access != undefined) {
        if (!next.access.allowAnonymous) {
          if (!$ssiUser.isLoggedIn || !$ssiUser.hasSomeRoles(next.access.allowedRoles)) {
            $location.path('/login')
          }
        }
      }
    })

    // handle login-based access restriction
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      for (var i in routes) {
        if (next.indexOf(i) != -1) {
          if (routes[i].access != undefined) {
            if (!routes[i].access.allowAnonymous) {
              if (!$ssiUser.isLoggedIn || !$ssiUser.hasSomeRoles(routes[i].access.allowedRoles)) {
                $location.path('/login')
              }
            }
          }
        }
      }
    })

  }
}
