'use strict'

var carrierControllers = angular.module('carrierControllers', [])

carrierControllers.controller('CarrierListController', ['$scope', 'Carrier',
  function($scope, Carrier){
    console.log('getting all carriers');
    Carrier.query(function(response) {
      $scope.loading = true
      console.log('this is the carriers: ' + JSON.stringify(response))
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
    console.log('getting a single carrier');
    Carrier.get({carrierId: $routeParams.carrierId}, function(response){
      $scope.loading = true;
      // console.log
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
