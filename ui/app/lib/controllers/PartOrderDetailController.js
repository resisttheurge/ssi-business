import { DetailController } from 'utils'

export default class PartOrderDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, PartOrder, enums) {
    super()

    $scope.partOrderStatuses = enums.partOrderStatuses
    $scope.partTypes = enums.partTypes

    PartOrder.endpoint.get($routeParams, function (response) {
      $scope.loading = true
      if (response.success) {
        $scope.partOrder = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })
  }
}
