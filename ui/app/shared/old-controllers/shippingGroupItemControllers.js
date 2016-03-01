import angular from 'angular'

export default
  angular.module('shippingGroupItemControllers', [])

    .controller('ShippingGroupItemListController', ['$scope', '$stateParams', 'selectionService', 'ShippingGroupItemByShippingGroup',
      function($scope, $stateParams, selectionService, ShippingGroupItemByShippingGroup) {
        $scope.loading = true
        $scope.selected = selectionService.selected
        $scope.selectShippingGroupItem = selectionService.selectShippingGroupItem
        ShippingGroupItemByShippingGroup.query($stateParams, function(response) {
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

    .controller('ShippingGroupItemDetailController', ['$scope', '$stateParams', 'ShippingGroupItem',
      function($scope, $stateParams, ShippingGroup) {
        $scope.loading = true
        ShippingGroupItem.get({shippingGroupItemId: $stateParams.shippingGroupItemId}, function(response){
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

    .name
