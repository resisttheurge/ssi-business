import angular from 'angular'

export default
  angular.module('partControllers', [])

    .controller('PartListController', ['$scope', 'Part',
      function($scope,  Part) {
        $scope.loading = true
        Part.query(function(response) {
          if(response.success) {
            $scope.parts = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    .controller('PartDetailController', ['$scope', '$stateParams', 'Part',
      function($scope, $stateParams, Part) {
        Part.get({partId: $stateParams.partId}, function(response){
          $scope.loading = true
          if(response.success) {
            $scope.part = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    .name
