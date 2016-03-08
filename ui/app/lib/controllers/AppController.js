export default class AppController {
  constructor(
    $scope, $route, $routeParams, $location, $rootScope, $mdSidenav, $mdMedia,
    $ssiUser, $ssiSelected, routes
  ) {
    // grab the user and logout function
    $scope.user = $ssiUser
    $scope.logout = function () {
      $ssiUser.reset()
      $location.path('/login')
    }

    $scope.selected = $ssiSelected

    $scope.isUserLoggedIn = function () {
      return $scope.user.isLoggedIn
    }

    $scope.isNavLockedOpen = function () {
      return $scope.user.isLoggedIn && $mdMedia('gt-sm')
    }

    // set up sidenav toggling
    $scope.toggleSidenav = function () {
      $mdSidenav('sidenav').toggle()
    }

    // handle login-based access restriction
    $scope.$on('$routeChangeStart', function (event, next, current) {
      if (next.access != undefined) {
        if (!next.access.allowAnonymous) {
          if ($ssiUser.isLoggedIn) {
            if (!$ssiUser.hasSomeRoles(next.access.allowedRoles)) {
              $location.path('/login')
            }
          } else {
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
              if ($ssiUser.user.isLoggedIn) {
                var allow = false
                for (var j in $ssiUser.user.roles) {
                  if (routes[i].access.allowedRoles.indexOf($ssiUser.user.roles[j]) != -1) {
                    allow = true
                  }
                }

                if (!allow) {
                  $location.path('/login')
                }
              } else {
                $location.path('/login')
              }
            }
          }
        }
      }
    })

  }
}
