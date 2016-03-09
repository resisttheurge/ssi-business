export default class PartOrderDetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, PartOrder) {
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
