export default class CarrierDetailController {
  constructor($scope, $routeParams, Carrier) {
    Carrier.endpoint.get({ carrierId: $routeParams.carrierId }, function (response) {
      $scope.loading = true;
      if (response.success) {
        $scope.carrier = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })
  }
}
