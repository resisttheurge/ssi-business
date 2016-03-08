export default class MarkDetailController {
  constructor($scope, $routeParams, Mark) {
    Mark.endpoint.get($routeParams, function (response) {
      $scope.loading = true
      if (response.success) {
        $scope.mark = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })
  }
}
