'use strict'

var carrierControllers = angular.module('carrierControllers', [])

carrierControllers.controller('CarrierListController', ['$scope', 'Carrier',
  function($scope, Carrier){
    $scope.loading = true
    Carrier.query(function(response) {

      if(response.success) {
        $scope.carriers = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])

carrierControllers.controller('CarrierDetailController', ['$scope', '$routeParams', 'Carrier',
  function($scope, $routeParams, Carrier){
    Carrier.get({carrierId: $routeParams.carrierId}, function(response){
      $scope.loading = true;
      if(response.success) {
        $scope.carrier = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
