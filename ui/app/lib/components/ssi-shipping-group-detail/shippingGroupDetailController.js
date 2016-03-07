'use strict'

var shippingGroupDetailController = angular.module('shippingGroupDetailController', [])

shippingGroupDetailController.controller(
  'ShippingGroupDetailController',
[
    '$scope',
    '$routeParams',
    'ShippingGroup',
    'selectionService',
  function($scope, $routeParams, ShippingGroup, selectionService) {

    ShippingGroup.get($scope, $scope.shippingGroup = {}, $routeParams.shippingGroupId);

  }
])
