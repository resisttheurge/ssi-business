import { DetailController } from 'utils'

export default class ManufacturerDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, Manufacturer) {
    super()
    Manufacturer.endpoint.get({ manufacturerId: $routeParams.manufacturerId }, function (response) {
      $scope.loading = true
      if (response.success) {
        $scope.manufacturer = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })
  }
}
