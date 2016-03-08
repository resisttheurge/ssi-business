export default function config(routes, $routeProvider) {

  for (var path in routes) {
    $routeProvider.when(path, routes[path])
  }

  $routeProvider.otherwise({ redirectTo: '/jobs' })

}
