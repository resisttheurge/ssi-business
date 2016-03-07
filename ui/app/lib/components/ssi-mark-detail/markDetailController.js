'use strict'

var markDetailController = angular.module('markDetailController', [])

markDetailController.controller(
  'MarkDetailController',
[
    '$scope',
    '$routeParams',
    'Mark',
    'selectionService',
  function($scope, $routeParams, Mark, selectionService) {

    Mark.get($scope, $scope.markId = {}, $routeParams.markId);

  }
])
