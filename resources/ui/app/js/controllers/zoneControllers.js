var zoneControllers = angular.module('zoneControllers', [])


// ShipmentItemByShipment??
zoneControllers.controller('ZoneListController', ['$scope', '$routeParams', 'selectionService', 'ZoneByJob',
  function($scope, $routeParams, selectionService, ZoneByJob) {
    $scope.loading = true
    $scope.selected = selectionService.selected
    $scope.selectZone = selectionService.selectZone
    ZoneByJob.query($routeParams, function(response) {
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
    $scope.loading = true
    Zone.get($routeParams, function(response){
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
