export default class PartDetailController {
  constructor($scope, $routeParams, Part) {
    Part.endpoint.get({ partId: $routeParams.partId }, function (response) {
      $scope.loading = true
      if (response.success) {
        $scope.part = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })
  }
}
