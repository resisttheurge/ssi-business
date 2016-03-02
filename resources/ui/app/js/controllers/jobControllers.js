'use strict'

var jobControllers = angular.module('jobControllers', [])

jobControllers.controller(
  'JobListController',
  [
    '$scope',
    'Job',
    '$filter',
    '$q',
  function($scope, Job, $filter, $q) {
    var orderBy = $filter('orderBy')

    $scope.selected = []
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id',
      filters: {
      }
    }

    $scope.onPaginate = function (page, limit) {
      return getJobs(angular.extend({}, $scope.query, {page: page, limit: limit}))
    }

    $scope.onReorder = function (order) {
      return getJobs(angular.extend({}, $scope.query, {order: order}))
    }

    function getJobs(query) {
      return $scope.promise =
        Job.query(query.filters).$promise
          .then(unpackResponse)
          .then(total)
          .then(sort(query))
          .then(page(query))
          .then(store)
    }

    function unpackResponse(response) {
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

    function total(array) {
      $scope.total = array.length
      return array
    }

    function sort(query) {
      return function(array) {
        return orderBy(array, query.order)
      }
    }

    function page(query) {
      var end = query.page * query.limit
        , begin = end - query.limit
      return function(array) {
        return array.slice(begin, end)
      }
    }

    function store(jobs) {
      return $scope.jobs = jobs
    }

    getJobs($scope.query)

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
