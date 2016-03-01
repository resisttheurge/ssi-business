import angular from 'angular'

export default
  angular.module('customerControllers', [])

    .controller('CustomerListController', ['$scope', '$stateParams', 'Customer',
      function($scope, $stateParams, Customer){
        $scope.loading = true
        Customer.query(function(response) {

          if(response.success) {
            $scope.customers = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    .controller('CustomerDetailController', ['$scope', '$stateParams', 'Customer',
      function($scope, $stateParams, Customer){
        Customer.get({customerId: $stateParams.customerId}, function(response){
          $scope.loading = true;
          if(response.success) {
            $scope.customer = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    .name
