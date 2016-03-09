export default class SystemTypeDetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, SystemType) {
    SystemType.endpoint.get({ systemTypeId: $routeParams.systemTypeId }, function (response) {
      $scope.loading = true
      if (response.success) {
        $scope.systemType = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }

      $scope.loading = false
    })
  }
}
