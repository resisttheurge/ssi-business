'use strict'

var shippingGroupItemControllers = angular.module('shippingGroupItemControllers', [])

shippingGroupItemControllers.controller('ShippingGroupItemListController', ['$scope', '$routeParams', 'selectionService', 'ShippingGroupItemByShippingGroup',
  function($scope, $routeParams, selectionService, ShippingGroupItemByShippingGroup) {
    $scope.loading = true
    $scope.selected = selectionService.selected
    $scope.selectShippingGroupItem = selectionService.selectShippingGroupItem
    ShippingGroupItemByShippingGroup.query($routeParams, function(response) {
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
    $scope.loading = true
    ShippingGroupItem.get({shippingGroupItemId: $routeParams.shippingGroupItemId}, function(response){
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
