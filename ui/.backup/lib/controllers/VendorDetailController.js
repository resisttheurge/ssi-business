import { DetailController } from 'utils'

export default class VendorDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, Vendor) {
    super()
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
