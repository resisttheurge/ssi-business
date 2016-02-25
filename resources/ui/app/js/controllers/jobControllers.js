'use strict'

var jobControllers = angular.module('jobControllers', [])

jobControllers.controller('JobListController', ['$scope', 'Job',
  function($scope, Job) {
    Job.query(function(response) {
      $scope.loading = true
      if(response.success) {
        $scope.jobs = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])


jobControllers.controller('JobDetailController', ['$scope', '$routeParams', 'Job',
  function($scope, $routeParams, Job) {
    Job.get({jobId: $routeParams.jobId}, function(response){
      $scope.loading = true
      if(response.success) {
        $scope.job = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
