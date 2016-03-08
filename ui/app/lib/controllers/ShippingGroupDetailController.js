export default class ShippingGroupDetailController {
  constructor($scope, $routeParams, ShippingGroup) {
    $scope.loading = true
    ShippingGroup.endpoint.get($routeParams, function (response) {
      if (response.success) {
        $scope.shippingGroup = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })
  }
}
