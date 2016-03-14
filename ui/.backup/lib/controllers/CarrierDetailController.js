import { DetailController } from 'utils'

export default class CarrierDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, Carrier) {
    super()
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
