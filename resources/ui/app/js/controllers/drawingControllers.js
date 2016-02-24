'use strict'

var drawingControllers = angular.module('drawingControllers', [])

drawingControllers.controller('DrawingListController', ['$scope', 'Drawing',
  function($scope, Drawing) {
    console.query(function(response) {
      $scope.loading = true
      console.log('this is the drawings: ' + JSON.stringify(response))
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
    console.log('getting the single Drawing');
    Drawing.get({drawingId: $routeParams.drawingId}, function(response){
      $scope.loading = true
      console.log('this is the drawing: ' + JSON.stringify(response))
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
