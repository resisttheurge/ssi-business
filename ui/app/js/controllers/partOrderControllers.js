'use strict'
var partOrderControllers = angular.module('partOrderControllers', [])
partOrderControllers.controller('PartOrderListController', ['$scope', '$routeParams', 'selectionService', 'PartOrderByJob',
  function($scope, $routeParams, selectionService, PartOrderByJob) {
    $scope.loading = true
    $scope.selected = selectionService.selected
    $scope.selectPartOrder = selectionService.selectPartOrder
    PartOrderByJob.query($routeParams, function(response) {
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

partOrderControllers.controller('PartOrderDetailController', ['$scope', '$routeParams', 'PartOrder',
  function($scope, $routeParams, PartOrder) {
    PartOrder.get($routeParams, function(response){
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
