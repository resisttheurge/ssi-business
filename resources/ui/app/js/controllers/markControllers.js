'use strict'
var markControllers = angular.module('markControllers', [])

markControllers.controller('MarkListController', ['$scope', '$routeParams', 'selectionService', 'MarkByDrawing',
  function($scope, $routeParams, selectionService, MarkByDrawing) {
    $scope.loading = true
    $scope.selected = selectionService.selected
    $scope.selectMark = selectionService.selectMark
    MarkByDrawing.query($routeParams, function(response) {

      if(response.success) {
        $scope.marks = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])

// Come back to this one
markControllers.controller('MarkDetailController', ['$scope', '$routeParams', 'Mark',
  function($scope, $routeParams, Mark) {
    Mark.get($routeParams, function(response){
      $scope.loading = true
      if(response.success) {
        $scope.mark = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
