'use strict'

var drawingDetailController = angular.module('ssi.controllers.DrawingDetail', [])

drawingDetailController.controller(
  'DrawingDetailController',
  [
    '$scope',
    '$routeParams',
    'specialtyItemService',
    'selectionService',
 function($scope, $routeParams, Job, selectionService, specialtyItemService) {

        Customer.get($scope, $scope.customers = {});

        Shop.get($scope, $scope.shops = {});
        Salesperson.get($scope, $scope.salespeople = {});
        $scope.prefixes = prefixService.prefixes;
        $scope.jobStatuses = jobStatusService.jobStatuses;

      }
    ])
