import angular from 'angular'

export default
  angular.module('userControllers', [])

    .controller('UserListController', ['$scope', 'User',
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

    .controller('UserDetailController', ['$scope', '$stateParams', 'User',
      function($scope, $stateParams, User) {
        User.get({userId: $stateParams.userId}, function(response){
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

    .name
