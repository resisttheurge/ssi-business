'use strict'

var jobDetailController = angular.module('ssi.controllers.jobDetail', [])

jobDetailController.controller(
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
    Job.get($scope, $scope.job = {}, $routeParams.jobId).then(function()
    {
      $scope.startDateDisplay       = $scope.job.startDate && new Date($scope.job.startDate)
      $scope.dueDateDisplay         = $scope.job.dueDate && new Date($scope.job.dueDate)
      $scope.completeDateDisplay    = $scope.job.completeDate && new Date($scope.job.completeDate)
    });

    Shop.get($scope, $scope.shops = {});
    Salesperson.get($scope, $scope.salespeople = {});
    $scope.prefixes = prefixService.prefixes;
    $scope.jobStatuses = jobStatusService.jobStatuses;

  }
])
