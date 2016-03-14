import { DetailController } from 'utils'

export default class CustomerDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, Customer) {
    super()
    Customer.endpoint.get({ customerId: $routeParams.customerId }, function (response) {
      $scope.loading = true;
      if (response.success) {
        $scope.customer = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })
  }
}
