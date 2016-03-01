import angular from 'angular'

export default
  angular.module('drawingControllers', [])

    .controller(
      'DrawingListController',
      [
        '$scope',
        '$stateParams',
        'selectionService',
        'DrawingByJob',
      function($scope, $stateParams, selectionService, DrawingByJob) {
        $scope.loading = true
        $scope.selected = selectionService.selected
        $scope.selectDrawing = selectionService.selectDrawing
        DrawingByJob.query($stateParams,function(response) {
          if(response.success) {
            $scope.drawings = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    .controller('DrawingDetailController', ['$scope', '$stateParams', 'Drawing',
      function($scope, $stateParams, Drawing) {
        Drawing.get($stateParams, function(response){
          $scope.loading = true
          if(response.success) {
            $scope.drawing = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    .name
