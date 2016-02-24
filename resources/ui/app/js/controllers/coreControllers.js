'use strict'

var coreControllers = angular.module('coreControllers', [])

coreControllers.controller(
  'HomeController',
  [
    '$scope',
    function($scope) {

    }
  ]
)

coreControllers.controller(
  'LoginController',
  [
    '$scope',
    'Auth',
    function($scope) {

    }
  ]
)

coreControllers.controller(
  'RootController',
  [
    '$scope',
    function($scope) {

    }
  ]
)
