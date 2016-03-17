import { AbstractController } from 'utils'

export default class AppController extends AbstractController {
  /*@ngInject*/
  constructor(
    $route, $routeParams, $location, $rootScope, $mdSidenav, $mdMedia,
    $ssiUser, $ssiSelected, routes, routeValidation
  ) {
    super()

    // grab the user and selected states, and expose them to the scope
    this.user = $ssiUser
    this.selected = $ssiSelected

    this.logout = () =>
      $ssiUser.logout()
        .then(() => $location.path('/login'))

    this.isNavLockedOpen = () =>
      $ssiUser.isLoggedIn && $mdMedia('gt-sm')

    this.toggleSidenav = () =>
      $mdSidenav('sidenav').toggle()

    if (routeValidation) {
      // handle login-based access restriction
      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        console.log('[root scope] route change start')
        if (next.$$route && next.$$route.access != undefined) {
          if (!next.$$route.access.allowAnonymous) {
            if (!$ssiUser.hasSomeRoles(next.$$route.access.allowedRoles)) {
              event.preventDefault()
              $location.path('/login')
              console.log('access denied [not logged in or disallowed role]')
            }
          }
        }
      })

      // handle login-based access restriction
      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        console.log('[root scope] location change start')
        for (var i in routes) {
          if (next.indexOf(i) != -1) {
            if (routes[i].access != undefined) {
              if (!routes[i].access.allowAnonymous) {
                if (!$ssiUser.hasSomeRoles(routes[i].access.allowedRoles)) {
                  event.preventDefault()
                  $location.path('/login')
                  console.log('access denied [not logged in or disallowed role]')
                }
              }
            }
          }
        }
      })
    }
  }
}
