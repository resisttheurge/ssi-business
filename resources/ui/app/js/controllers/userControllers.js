var userControllers = angular.module('userControllers', [])

systemTypeControllers.controller('SystemTypeListController', ['$scope', 'User',
  function($scope, User) {
    // console.log('getting the ShippingGroupDetail');
    User.query(function(response) {
      $scope.loading = true
      console.log('this is the users: ' + JSON.stringify(response))
      if(response.success) {
        $scope.users = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }

systemTypeControllers.controller('SystemTypeDetailController', ['$scope', '$routeParams', 'User',
  function($scope, $routeParams, User) {
    // console.log('getting the ShippingGroupDetail');
    User.get({userId: $routeParams.userId}, function(response){
      $scope.loading = true
      console.log('this is the user: ' + JSON.stringify(response))
      if(response.success) {
        $scope.user = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
