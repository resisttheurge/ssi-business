import angular from 'angular'

export default
  angular.module('salespersonControllers', [])

    .controller('SalespersonListController', ['$scope', 'Salesperson',
      function($scope, Salesperson) {
        $scope.loading = true
        Salesperson.query(function(response) {
          if(response.success) {
            $scope.salespeople = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    .controller('SalespersonDetailController', ['$scope', '$stateParams', 'Salesperson',
      function($scope, $stateParams, Salesperson) {
        Salesperson.get({salespersonId: $stateParams.salespersonId}, function(response){
          $scope.loading = true
          if(response.success) {
            $scope.salesperson = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    .name
