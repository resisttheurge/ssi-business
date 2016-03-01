import angular from 'angular'

export default
  angular.module('manufacturerControllers', [])

    .controller('ManufacturerListController', ['$scope', 'Manufacturer',
      function($scope, Manufacturer) {
        $scope.loading = true
        Manufacturer.query(function(response) {

          if(response.success) {
            $scope.manufacturers = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    .controller('ManufacturerDetailController', ['$scope', '$stateParams', 'Manufacturer',
      function($scope, $stateParams, Manufacturer) {
        Manufacturer.get({manufacturerId: $stateParams.manufacturerId}, function(response){
          $scope.loading = true
          if(response.success) {
            $scope.manufacturer = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    .name
