'use strict'
var partOrderControllers = angular.module('partOrderControllers', [])
partOrderControllers.controller('PartOrderListController', ['$scope', 'PartOrder',
  function($scope, PartOrder) {
    // console.log('getting the single Drawing');
    PartOrder.query(function(response) {
      $scope.loading = true
      console.log('this is the partOrders: ' + JSON.stringify(response))
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
    console.log('getting the single PartOrder');
    PartOrder.get({partOrderId: $routeParams.partOrderId}, function(response){
      $scope.loading = true
      console.log('this is the partOrder: ' + JSON.stringify(response))
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
