import angular from 'angular'

export default
  angular.module('specialtyItemControllers', [])

    .controller('SpecialtyItemListController', ['$scope', 'SpecialtyItem',
      function($scope, SpecialtyItem) {
        $scope.loading = true
        SpecialtyItem.query(function(response) {

          if(response.success) {
            $scope.specialtyItems = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    .controller('SpecialtyItemDetailController', ['$scope', '$stateParams', 'SpecialtyItem',
      function($scope, $stateParams, SpecialtyItem) {
        SpecialtyItem.get({specialtyItemId: $stateParams.specialtyItemId}, function(response){
          $scope.loading = true
          if(response.success) {
            $scope.specialtyItem = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    .name
