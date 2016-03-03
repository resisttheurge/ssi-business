'use strict'

var jobControllers = angular.module('jobControllers', [])

jobControllers.controller(
  'JobListController',
  [
    '$scope',
    'Job',
    '$filter',
    '$q',
    'selectionService',
  function($scope, Job, $filter, $q, selectionService) {
    var orderBy = $filter('orderBy')

    $scope.selectJob = selectionService.selectJob
    $scope.prefixes = [
      'B',
      'F',
      'FC',
      'FE',
      'FR',
      'FS',
      'M',
      'MF',
      'MT',
      'RG',
      'BM',
      'LM',
      'MM',
      'D',
      'G',
      'DR',
      'EE',
      'ME',
      'MS',
      'TM'
    ]
    $scope.selected = []
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id',
      filters: {
        active: true
      }
    }

    $scope.onActiveChange = function(active) {
      $scope.query.filters.active = active
      return getJobs($scope.query)
    }

    $scope.onPrefixChange = function(prefix) {
      $scope.query.filters.prefix = prefix
      return getJobs($scope.query)
    }

    $scope.onPaginate = function (page, limit) {
      return getJobs(angular.extend({}, $scope.query, {page: page, limit: limit}))
    }

    $scope.onReorder = function (order) {
      return getJobs(angular.extend({}, $scope.query, {order: order}))
    }

    function getJobs(query) {
      return $scope.promise =
        Job.endpoint.query(query.filters).$promise
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
