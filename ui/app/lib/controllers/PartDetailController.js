import { DetailController } from 'utils'

export default class PartDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, Part, enums) {
    super()

    $scope.partTypes = enums.partTypes

    Part.endpoint.get({ partId: $routeParams.partId }, function (response) {
      $scope.loading = true
      if (response.success) {
        $scope.part = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })
  }
}
