var systemTypeControllers = angular.module('systemTypeControllers', [])

systemTypeControllers.controller('SystemTypeListController', ['$scope', 'SystemType',
  function($scope, SystemType) {
    $scope.loading = true
    SystemType.query(function(response) {

      if(response.success) {
        $scope.systemTypes = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])

systemTypeControllers.controller('SystemTypeDetailController', ['$scope', '$routeParams', 'SystemType',
  function($scope, $routeParams, SystemType) {
    SystemType.get({systemTypeId: $routeParams.systemTypeId}, function(response){
      $scope.loading = true
      if(response.success) {
        $scope.systemType = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
