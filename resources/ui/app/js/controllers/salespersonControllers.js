var salespersonControllers = angular.module('salespersonControllers', [])

salespersonControllers.controller('SalespersonListController', ['$scope', 'Salesperson',
  function($scope, Salesperson) {
    // console.log('getting the ShippingGroupDetail');
    Salesperson.query(function(response) {
      $scope.loading = true
      console.log('this is the salesPersons: ' + JSON.stringify(response))
      if(response.success) {
        $scope.salesPersons = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])

salespersonControllers.controller('SalespersonDetailController', ['$scope', '$routeParams', 'Salesperson',
  function($scope, $routeParams, Salesperson) {
    // console.log('getting the ShippingGroupDetail');
    Salesperson.get({salespersonId: $routeParams.salespersonId}, function(response){
      $scope.loading = true
      console.log('this is the salesperson: ' + JSON.stringify(response))
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
