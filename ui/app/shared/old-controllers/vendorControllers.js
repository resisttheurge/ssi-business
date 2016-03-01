import angular from 'angular'

export default
  angular.module('vendorControllers', [])

    .controller('VendorListController', ['$scope', 'Vendor',
      function($scope, Vendor) {
        $scope.loading = true
        Vendor.query(function(response) {

          if(response.success) {
            $scope.vendors = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
        }
    ])

    .controller('VendorDetailController', ['$scope', '$stateParams', 'Vendor',
      function($scope, $stateParams, Vendor) {
        Vendor.get({vendorId: $stateParams.vendorId}, function(response){
          $scope.loading = true
          if(response.success) {
            $scope.vendor = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    .name
