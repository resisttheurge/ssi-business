import angular from 'angular'

export default
  angular.module('partOrderControllers', [])

    .controller('PartOrderListController', ['$scope', '$stateParams', 'selectionService', 'PartOrderByJob',
      function($scope, $stateParams, selectionService, PartOrderByJob) {
        $scope.loading = true
        $scope.selected = selectionService.selected
        $scope.selectPartOrder = selectionService.selectPartOrder
        PartOrderByJob.query($stateParams, function(response) {
          if(response.success) {
            $scope.partOrders = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    .controller('PartOrderDetailController', ['$scope', '$stateParams', 'PartOrder',
      function($scope, $stateParams, PartOrder) {
        PartOrder.get($stateParams, function(response){
          $scope.loading = true
          if(response.success) {
            $scope.partOrder = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    .name
