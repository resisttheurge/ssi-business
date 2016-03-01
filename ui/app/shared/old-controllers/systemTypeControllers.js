import angular from 'angular'

export default
  angular.module('systemTypeControllers', [])

    .controller('SystemTypeListController', ['$scope', 'SystemType',
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

    .controller('SystemTypeDetailController', ['$scope', '$stateParams', 'SystemType',
      function($scope, $stateParams, SystemType) {
        SystemType.get({systemTypeId: $stateParams.systemTypeId}, function(response){
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

    .name
