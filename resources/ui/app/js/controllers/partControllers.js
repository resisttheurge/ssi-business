'use strict'
var partControllers = angular.module('partControllers', [])

partControllers.controller('PartListController', ['$scope', 'Part',
  function($scope,  Part) {
    // console.log('getting the single Drawing');
    Part.query(function(response) {
      $scope.loading = true
      console.log('this is the parts: ' + JSON.stringify(response))
      if(response.success) {
        $scope.parts = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])

partControllers.controller('PartDetailController', ['$scope', '$routeParams', 'Part',
  function($scope, $routeParams, Part) {
    console.log('getting the single partId');
    Part.get({partId: $routeParams.partId}, function(response){
      $scope.loading = true
      console.log('this is the part: ' + JSON.stringify(response))
      if(response.success) {
        $scope.part = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
