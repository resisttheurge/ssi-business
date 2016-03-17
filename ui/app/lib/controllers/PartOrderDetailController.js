import { DetailController } from 'utils'

export default class PartOrderDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, PartOrder, enums, $ssiSelected) {
    super()

    $scope.partOrderStatuses = enums.partOrderStatuses
    $scope.partTypes = enums.partTypes
    $scope.job = $ssiSelected.job;
    $scope.partOrder = $ssiSelected.partOrder;

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
