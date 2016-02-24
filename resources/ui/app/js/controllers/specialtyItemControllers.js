var specialtyItemControllers = angular.module('specialtyItemControllers', [])

specialtyItemControllers.controller('SpecialtyItemListController', ['$scope', 'SpecialtyItem',
  function($scope, SpecialtyItem) {
    // console.log('getting the ShippingGroupDetail');
    SpecialtyItem.query(function(response) {
      $scope.loading = true
      console.log('this is the specialtyItems: ' + JSON.stringify(response))
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
    // console.log('getting the ShippingGroupDetail');
    SpecialtyItem.get({specialtyItemId: $routeParams.specialtyItemId}, function(response){
      $scope.loading = true
      console.log('this is the specialtyItem: ' + JSON.stringify(response))
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
