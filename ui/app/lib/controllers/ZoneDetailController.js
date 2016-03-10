import { DetailController } from 'utils'

export default class ZoneDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, Zone) {
    super()
    $scope.loading = true
    Zone.endpoint.get($routeParams, function (response) {
      if (response.success) {
        $scope.zoneId = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })
  }
}
