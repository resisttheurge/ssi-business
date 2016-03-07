'use strict'
var markControllers = angular.module('markControllers', [])

markControllers.controller('MarkListController', [
  '$scope', 'MarkByDrawing', '$filter', '$q', '$routeParams', 'selectionService',
  function($scope, MarkByDrawing, $filter, $q, $routeParams, selectionService){
    $scope.selected = selectionService.selected
    $scope.selectMark = selectionService.selectMark
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.onPaginate = function (page, limit) {
      return getMarks(angular.extend({}, $scope.query, {page: page, limit: limit}))
    }

    $scope.onReorder = function (order) {
      return getMarks(angular.extend({}, $scope.query, {order: order}))
    }

    function getMarks(query) {
      return $scope.promise =
        MarkByDrawing.endpoint.query($routeParams).$promise
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

    function store(marks) {
      return $scope.marks = marks
    }

    getMarks($scope.query)
  }
])

// Come back to this one
markControllers.controller('MarkDetailController', ['$scope', '$routeParams', 'Mark',
  function($scope, $routeParams, Mark) {
    Mark.endpoint.get($routeParams, function(response){
      $scope.loading = true
      if(response.success) {
        $scope.mark = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
