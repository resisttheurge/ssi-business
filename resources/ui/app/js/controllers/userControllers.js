var userControllers = angular.module('userControllers', [])

userControllers.controller('UserListController', ['$scope', 'User',
  function($scope, User) {
    $scope.loading = true
    User.query(function(response) {

      if(response.success) {
        $scope.users = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])

userControllers.controller('UserDetailController', ['$scope', '$routeParams', 'User',
  function($scope, $routeParams, User) {
    User.get({userId: $routeParams.userId}, function(response){
      $scope.loading = true
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
