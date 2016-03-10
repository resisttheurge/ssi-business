import { DetailController } from 'utils'

export default class ShippingGroupItemDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, ShippingGroupItem) {
    super()
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
