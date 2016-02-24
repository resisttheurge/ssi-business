'use strict'
var markControllers = angular.module('markControllers', [])

markControllers.controller('MarkListController', ['$scope', 'Mark',
  function($scope, Mark) {
    console.log('getting the marks');
    Mark.query(function(response) {
      $scope.loading = true
      console.log('this is the marks: ' + JSON.stringify(response))
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
    console.log('getting the single Mark');
    Mark.get({markId: $routeParams.markId}, function(response){
      $scope.loading = true
      console.log('this is the mark: ' + JSON.stringify(response))
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
