import angular from 'angular'

export default
  angular.module('shippingGroupControllers', [])

    .controller('ShippingGroupListController', ['$scope', '$stateParams', 'selectionService', 'ShippingGroupByJob',
      function($scope, $stateParams, selectionService, ShippingGroupByJob) {
        $scope.loading = true
        $scope.selected = selectionService.selected
        $scope.selectShippingGroup = selectionService.selectShippingGroup
        ShippingGroupByJob.query($stateParams, function(response) {
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

    .controller('ShippingGroupDetailController', ['$scope', '$stateParams', 'ShippingGroup',
      function($scope, $stateParams, ShippingGroup) {
        $scope.loading = true
        ShippingGroup.get($stateParams, function(response){
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

    .name
