import angular from 'angular'

export default
  angular.module('carrierControllers', [])

    .controller('CarrierListController', ['$scope', 'Carrier',
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

    .controller('CarrierDetailController', ['$scope', '$stateParams', 'Carrier',
      function($scope, $stateParams, Carrier){
        console.log(`I'm getting called in the carrier detail controller`)
        Carrier.get({carrierId: $stateParams.carrierId}, function(response){
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

    .name
