var systemTypeControllers = angular.module('systemTypeControllers', [])

systemTypeControllers.controller('SystemTypeListController', ['$scope', 'SystemType',
  function($scope, SystemType) {
    // console.log('getting the ShippingGroupDetail');
    SystemType.query(function(response) {
      $scope.loading = true
      console.log('this is the systemTypes: ' + JSON.stringify(response))
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
    // console.log('getting the ShippingGroupDetail');
    SystemType.get({systemTypeId: $routeParams.systemTypeId}, function(response){
      $scope.loading = true
      console.log('this is the systemType: ' + JSON.stringify(response))
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
