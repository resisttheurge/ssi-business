export default class CustomerDetailController {
  constructor($scope, $routeParams, Customer) {
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
