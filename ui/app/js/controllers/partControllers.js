'use strict'
var partControllers = angular.module('partControllers', [])

partControllers.controller('PartListController', ['$scope', 'Part',
  function($scope,  Part) {
    $scope.loading = true
    Part.query(function(response) {
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
    Part.get({partId: $routeParams.partId}, function(response){
      $scope.loading = true
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
