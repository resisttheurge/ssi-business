import { DetailController } from 'utils'

export default class SpecialtyItemDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, SpecialtyItem) {
    super()
    SpecialtyItem.endpoint.get({ specialtyItemId: $routeParams.specialtyItemId },
      function (response) {
        $scope.loading = true
        if (response.success) {
          $scope.specialtyItem = response.data
        } else {
          $scope.error = true
          $scope.message = response.message
        }

        $scope.loading = false
      }
    )
  }
}
