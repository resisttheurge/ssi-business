'use strict'

var drawingControllers = angular.module('drawingControllers', [])

drawingControllers.controller(
  'DrawingListController',
  [
    '$scope',
    '$routeParams',
    'selectionService',
    'DrawingByJob',
  function($scope, $routeParams, selectionService, DrawingByJob) {
    $scope.loading = true
    $scope.selected = selectionService.selected
    $scope.selectDrawing = selectionService.selectDrawing
    DrawingByJob.query($routeParams,function(response) {
      if(response.success) {
        $scope.drawings = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])

drawingControllers.controller('DrawingDetailController', ['$scope', '$routeParams', 'Drawing',
  function($scope, $routeParams, Drawing) {
    Drawing.get($routeParams, function(response){
      $scope.loading = true
      if(response.success) {
        $scope.drawing = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
