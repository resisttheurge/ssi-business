export default class VendorDetailController {
  constructor($scope, $routeParams, Vendor) {
    Vendor.endpoint.get({ vendorId: $routeParams.vendorId }, function (response) {
      $scope.loading = true
      if (response.success) {
        $scope.vendor = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })
  }
}
