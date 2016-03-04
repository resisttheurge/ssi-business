'use strict'

var jobDetailController = angular.module('jobDetailController', [])

jobDetailController.controller(
  'JobDetailController',
[
    '$scope',
    '$routeParams',
    '$q',
    'Customer',
    'Job',
    'Shop',
    'Salesperson',
    'enums',
  function($scope, $routeParams, $q, Customer, Job, Shop, Salesperson, enums) {
    var self = this
    var promises = []

    function resolve() {
      if(!promises.length){
        return $scope.$applyAsync()
      }
      promises[0].then(function(){
        promises.shift()
        resolve()
      })
    }

    function queue(promise) {
      if(!promise){
        return
      }
      if(promises.push(angular.isArray(promise) ? $q.all(promise) : $q.when(promise)) === 1){
        resolve()
      }
    }

    function unpack(response) {
      return $q(function(resolve, reject) {
        if(response) {
          if(response.success) {
            return resolve(response.data)
          } else {
            return reject(response.message ? response.message : 'API response failed')
          }
        } else {
          return reject('API response was undefined')
        }
      })
    }

    function refresh() {
      console.log('refreshing')
      $scope.promise = $q.all({
        job: Job.endpoint.get($routeParams).$promise.then(unpack),
        customers: Customer.endpoint.query().$promise.then(unpack),
        shops: Shop.endpoint.query().$promise.then(unpack),
        salespeople: Salesperson.endpoint.query().$promise.then(unpack),
      }).then(function(data){
        console.log('extending')

        angular.extend($scope, data, {
          startDateDisplay: data.job.startDate && new Date(data.job.startDate),
          dueDateDisplay: data.job.dueDate && new Date(data.job.dueDate),
          completeDateDisplay: data.job.completeDate && new Date(data.job.completeDate),
          loading: false
        })
        console.log('extending done')
      })
    }

    $scope.prefixes = enums.prefixes;
    $scope.jobStatuses = enums.jobStatuses;
    $scope.$watch('promise', queue)
    refresh()

    // Customer.get($scope.customers = {});
    // Job.get($scope.job = {}, $routeParams.jobId).then(function(){
    //   $scope.startDateDisplay       = $scope.job.startDate && new Date($scope.job.startDate)
    //   $scope.dueDateDisplay         = $scope.job.dueDate && new Date($scope.job.dueDate)
    //   $scope.completeDateDisplay    = $scope.job.completeDate && new Date($scope.job.completeDate)
    // });
    // Shop.get($scope.shops = {});
    // Salesperson.get($scope.salespeople = {});

  }
])
