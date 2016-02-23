'use strict'

var ssiControllers = angular.module('ssiControllers', [])

ssiControllers.controller('JobListController', ['$scope', 'Job',
  function($scope, Job) {
    console.log('getting the jerbs');
    Job.query(function(response) {
      $scope.loading = true
      console.log('this is the jobs: ' + JSON.stringify(response))
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

ssiControllers.controller('JobDetailController', ['$scope', '$routeParams', 'Job',
  function($scope, $routeParams, Job) {
    console.log('getting the single jerb');
    Job.get({jobId: $routeParams.jobId}, function(response){
      $scope.loading = true
      console.log('this is the job: ' + JSON.stringify(response))
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
