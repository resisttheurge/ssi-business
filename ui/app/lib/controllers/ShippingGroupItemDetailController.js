export default class ShippingGroupItemDetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, ShippingGroup) {
    $scope.loading = true
    ShippingGroupItem.endpoint.get({ shippingGroupItemId: $routeParams.shippingGroupItemId },
      function (response) {
        if (response.success) {
          $scope.shippingGroupItem = response.data
        } else {
          $scope.error = true
          $scope.message = response.message
        }

        $scope.loading = false
      }
    )
  }
}
