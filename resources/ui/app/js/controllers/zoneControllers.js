var zoneControllers = angular.module('zoneControllers', [])


// ShipmentItemByShipment??
zoneControllers.controller('ZoneListController', ['$scope', 'Zone',
  function($scope, Zone) {
    // console.log('getting the ShippingGroupDetail');
    Zone.query(function(response) {
      $scope.loading = true
      console.log('this is the zones: ' + JSON.stringify(response))
      if(response.success) {
        $scope.zones = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])

zoneControllers.controller('ZoneDetailController', ['$scope', '$routeParams', 'Zone',
  function($scope, $routeParams, Zone) {
    // console.log('getting the ShippingGroupDetail');
    Zone.get({zoneId: $routeParams.zoneId}, function(response){
      $scope.loading = true
      console.log('this is the zoneId: ' + JSON.stringify(response))
      if(response.success) {
        $scope.zoneId = response.data
      } else {
        $scope.error = true
        $scope.message = response.message
      }
      $scope.loading = false
    })
  }
])
