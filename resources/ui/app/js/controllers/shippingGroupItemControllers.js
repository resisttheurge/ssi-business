var shippingGroupItemControllers = angular.module('shippingGroupItemControllers' [])

shippingGroupItemControllers.controller('ShippingGroupItemListController', ['$scope', 'ShippingGroupItem',
  function($scope, ShippingGroup) {
    console.log('getting the shippingGroupItems');
    ShippingGroupItem.query(function(response) {
      $scope.loading = true
      console.log('this is the shippingGroupItems: ' + JSON.stringify(response))
      if(response.success) {
        $scope.shippingGroupItems = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])

shippingGroupItemControllers.controller('ShippingGroupItemDetailController', ['$scope', '$routeParams', 'ShippingGroupItem',
  function($scope, $routeParams, ShippingGroup) {
    console.log('getting the ShippingGroupDetail');
    ShippingGroupItem.get({shippingGroupItemId: $routeParams.shippingGroupItemId}, function(response){
      $scope.loading = true
      console.log('this is the shippingGroupItem: ' + JSON.stringify(response))
      if(response.success) {
        $scope.shippingGroupItem = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
