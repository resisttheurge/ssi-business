export default class ManufacturerDetailController {
  constructor($scope, $routeParams, Manufacturer) {
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
