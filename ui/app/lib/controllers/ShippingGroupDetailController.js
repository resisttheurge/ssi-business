import { DetailController } from 'utils'

export default class ShippingGroupDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, ShippingGroup, enums) {
    super()

    $scope.tagTypes = enums.tagTypes
    $scope.loading  = true

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
