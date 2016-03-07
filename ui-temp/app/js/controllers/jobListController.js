'use strict'

var jobControllers = angular.module('jobControllers', [])

jobControllers.controller('JobListController', [
  '$scope', 'Job', '$filter', '$q', 'selectionService', 'enums',
  function($scope, Job, $filter, $q, selectionService, enums) {
    var orderBy = $filter('orderBy')
    $scope.prefixes = enums.prefixes;

    $scope.selectJob = selectionService.selectJob

    $scope.$watch("search", function(x, y){ getJobs($scope.query) }, true)

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
          .then(jobSearchFilter)
          .then(total)
          .then(sort(query))
          .then(page(query))
          .then(store)
    }

    function jobSearchFilter(jobs) {

      var resultArray = [];
      if($scope.search)
      {
        if(jobs)
          jobs.forEach(function(job){

              if($scope.search.prefix && job.identifier.prefix !== $scope.search.prefix){}
                //don't add to results array
              else if($scope.search.year && !job.identifier.year.toString().substring(2, 4).match(new RegExp("^" + $scope.search.year.toString() + ".*"))){}
                //don't add to results array
              else if($scope.search.label && !job.identifier.label.toUpperCase().match(new RegExp("^" + $scope.search.label.toUpperCase() + ".*"))){}
                //don't add to results array
              else
                //doesn't violate constraints, add to results array
                resultArray.push(job);
          })
          return resultArray;
      }
      else
        return jobs;

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
