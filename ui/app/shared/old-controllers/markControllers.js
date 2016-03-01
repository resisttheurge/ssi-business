import angular from 'angular'

export default
  angular.module('markControllers', [])

    .controller('MarkListController', ['$scope', '$stateParams', 'selectionService', 'MarkByDrawing',
      function($scope, $stateParams, selectionService, MarkByDrawing) {
        $scope.loading = true
        $scope.selected = selectionService.selected
        $scope.selectMark = selectionService.selectMark
        MarkByDrawing.query($stateParams, function(response) {

          if(response.success) {
            $scope.marks = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    // Come back to this one
    .controller('MarkDetailController', ['$scope', '$stateParams', 'Mark',
      function($scope, $stateParams, Mark) {
        Mark.get($stateParams, function(response){
          $scope.loading = true
          if(response.success) {
            $scope.mark = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    .name
