import angular from 'angular'

export default
  angular.module('zoneControllers', [])

    .controller('ZoneListController', ['$scope', '$stateParams', 'selectionService', 'ZoneByJob',
      function($scope, $stateParams, selectionService, ZoneByJob) {
        $scope.loading = true
        $scope.selected = selectionService.selected
        $scope.selectZone = selectionService.selectZone
        ZoneByJob.query($stateParams, function(response) {
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

    .controller('ZoneDetailController', ['$scope', '$stateParams', 'Zone',
      function($scope, $stateParams, Zone) {
        $scope.loading = true
        Zone.get($stateParams, function(response){
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

    .name
