'use strict'
var shipmentControllers = angular.module('shipmentControllers', [])

shipmentControllers.controller('ShipmentListController', [
  '$scope', 'ShipmentByJob', '$filter', '$q', '$routeParams', 'selectionService',
  function($scope, ShipmentByJob, $filter, $q, $routeParams, selectionService){
    $scope.selected = selectionService.selected
    $scope.selectShipment = selectionService.selectShipment
    var orderBy = $filter('orderBy')
    $scope.query = {
      page: 1,
      limit: 10,
      order: 'id'
    }

    $scope.onPaginate = function (page, limit) {
      return getShipments(angular.extend({}, $scope.query, {page: page, limit: limit}))
    }

    $scope.onReorder = function (order) {
      return getShipments(angular.extend({}, $scope.query, {order: order}))
    }

    function getShipments(query) {
      return $scope.promise =
        ShipmentByJob.endpoint.query($routeParams).$promise
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

    function store(shipments) {
      return $scope.shipments = shipments
    }

    getShipments($scope.query)
  }
])

shipmentControllers.controller('ShipmentDetailController', ['$scope', '$routeParams', 'Shipment',
  function($scope, $routeParams, Shipment) {
    $scope.loading = true
    Shipment.endpoint.get({shipmentId: $routeParams.shipmentId}, function(response){
      if(response.success) {
        $scope.shipment = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
