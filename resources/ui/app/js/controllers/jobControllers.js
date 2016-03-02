'use strict'

var jobControllers = angular.module('jobControllers', [])

jobControllers.controller(
  'JobListController',
  [
    '$scope',
    'selectionService',
    'Job',
  function($scope, selectionService, Job) {
    $scope.loading = true
    $scope.selectJob = selectionService.selectJob
    Job.endpoint.query(function(response) {
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


jobControllers.controller(
  'JobDetailController',
[
    '$scope',
    '$routeParams',
    'Customer',
    'Job',
    'Shop',
    'Salesperson',
    'prefixService',
    'jobStatusService',
  function($scope, $routeParams, Customer, Job, Shop, Salesperson, prefixService, jobStatusService) {

    Customer.get($scope, $scope.customers = {});
    Job.get($scope, $scope.job = {}, $routeParams.jobId);
    Shop.get($scope, $scope.shops = {});
    Salesperson.get($scope, $scope.salespeople = {});
    $scope.prefixes = prefixService.prefixes;
    $scope.jobStatuses = jobStatusService.jobStatuses;

    var done = $scope.$watch('job', function()
    {
      $scope.startDateDisplay = new Date($scope.job.startDate)
      $scope.dueDateDisplay = new Date($scope.job.dueDate)
      $scope.completeDateDisplay = new Date($scope.job.completeDate)
    });
    //done();

  }
])
