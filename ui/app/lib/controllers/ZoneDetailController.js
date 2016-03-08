export default class ZoneDetailController {
  constructor($scope, $routeParams, Zone) {
    $scope.loading = true
    Zone.endpoint.get($routeParams, function (response) {
      if (response.success) {
        $scope.zoneId = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })
  }
}
