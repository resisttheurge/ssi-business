import { DetailController } from 'utils'

export default class MarkDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, Mark, enums) {
    super()

    $scope.shippingItemStatuses = enums.shippingItemStatuses

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
