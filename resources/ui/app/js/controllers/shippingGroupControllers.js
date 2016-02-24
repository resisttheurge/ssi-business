var shippingGroupControllers = angular.module('shippingGroupControllers', [])

shippingGroupControllers.controller('ShippingGroupListController', ['$scope', 'ShippingGroup',
  function($scope,  ShippingGroup) {
    console.log('getting the ShippingGroup');
    ShippingGroup.query(function(response) {
      $scope.loading = true
      console.log('this is the shippingGroups: ' + JSON.stringify(response))
      if(response.success) {
        $scope.shippingGroups = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])

shippingGroupControllers.controller('ShippingGroupDetailController', ['$scope', '$routeParams', 'ShippingGroup',
  function($scope, $routeParams, ShippingGroup) {
    console.log('getting the ShippingGroupDetail');
    ShippingGroup.get({shippingGroupId: $routeParams.shippingGroupId}, function(response){
      $scope.loading = true
      console.log('this is the shippingGroup: ' + JSON.stringify(response))
      if(response.success) {
        $scope.shippingGroup = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
