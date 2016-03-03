var specialtyItemControllers = angular.module('specialtyItemControllers', [])

specialtyItemControllers.controller('SpecialtyItemListController', ['$scope', 'SpecialtyItem',
  function($scope, SpecialtyItem) {
    $scope.loading = true
    SpecialtyItem.endpoint.query(function(response) {

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

specialtyItemControllers.controller('SpecialtyItemDetailController', ['$scope', '$routeParams', 'SpecialtyItem',
  function($scope, $routeParams, SpecialtyItem) {
    SpecialtyItem.endpoint.get({specialtyItemId: $routeParams.specialtyItemId}, function(response){
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
