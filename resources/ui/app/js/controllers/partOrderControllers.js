'use strict'
var partOrderControllers = angular.module('partOrderControllers', [])
partOrderControllers.controller('PartOrderListController', [
  '$scope', 'PartOrderByJob', '$filter', '$q', '$routeParams', 'selectionService',
  function($scope, PartOrderByJob, $filter, $q, $routeParams, selectionService){
    $scope.selected = selectionService.selected
    $scope.selectPartOrder = selectionService.selectPartOrder
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.onPaginate = function (page, limit) {
      return getPartOrders(angular.extend({}, $scope.query, {page: page, limit: limit}))
    }

    $scope.onReorder = function (order) {
      return getPartOrders(angular.extend({}, $scope.query, {order: order}))
    }

    function getPartOrders(query) {
      return $scope.promise =
        PartOrderByJob.endpoint.query($routeParams).$promise
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

    function store(partOrders) {
      return $scope.partOrders = partOrders
    }

    getPartOrders($scope.query)
  }
])

partOrderControllers.controller('PartOrderDetailController', ['$scope', '$routeParams', 'PartOrder',
  function($scope, $routeParams, PartOrder) {
    PartOrder.endpoint.get($routeParams, function(response){
      $scope.loading = true
      if(response.success) {
        $scope.partOrder = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
