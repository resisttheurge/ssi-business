import { DetailController } from 'utils'

export default class PartOrderDetailController extends DetailController {
  /*@ngInject*/
<<<<<<< HEAD
  constructor($scope, $routeParams, PartOrder, enums, $ssiSelected) {
=======
  constructor($scope, $routeParams, PartOrder, enums, $convertDate) {
>>>>>>> master
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

      $scope.requestDateDisplay = partOrder.requestDate != null ?
       $convertDate.stringToDate(partOrder.requestDate) : undefined

      $scope.purchaseDateDisplay = partOrder.purchaseDate != null ?
       $convertDate.stringToDate(partOrder.purchaseDate) : undefined

      $scope.releaseDateDisplay = partOrder.releaseDate != null ?
         $convertDate.stringToDate(partOrder.releaseDate) : undefined

      $scope.loading = false
    })
  }
}
