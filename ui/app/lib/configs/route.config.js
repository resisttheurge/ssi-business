
/*@ngInject*/
function routeConfig(routes, $locationProvider, $routeProvider) {

  $locationProvider.html5Mode(true)
  $routeProvider.otherwise({ redirectTo: '/jobs' })

  for (var path in routes) {
    $routeProvider.when(path, routes[path])
  }

}

export default routeConfig
