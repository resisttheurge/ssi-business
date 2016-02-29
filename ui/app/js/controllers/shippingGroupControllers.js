var shippingGroupControllers = angular.module('shippingGroupControllers', [])

shippingGroupControllers.controller('ShippingGroupListController', ['$scope', '$routeParams', 'selectionService', 'ShippingGroupByJob',
  function($scope, $routeParams, selectionService, ShippingGroupByJob) {
    $scope.loading = true
    $scope.selected = selectionService.selected
    $scope.selectShippingGroup = selectionService.selectShippingGroup
    ShippingGroupByJob.query($routeParams, function(response) {
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
    $scope.loading = true
    ShippingGroup.get($routeParams, function(response){
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
