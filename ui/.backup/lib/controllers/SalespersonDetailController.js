import { DetailController } from 'utils'

export default class SalespersonDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, Salesperson) {
    super()
    Salesperson.endpoint.get({ salespersonId: $routeParams.salespersonId }, function (response) {
      $scope.loading = true
      if (response.success) {
        $scope.salesperson = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })
  }
}
