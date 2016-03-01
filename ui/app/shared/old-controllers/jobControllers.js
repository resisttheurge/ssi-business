import angular from 'angular'

export default
  angular.module('jobControllers', [])

    .controller(
      'JobListController',
      [
        '$scope',
        'selectionService',
        'Job',
      function($scope, selectionService, Job) {
        $scope.loading = true
        $scope.selectJob = selectionService.selectJob
        Job.query(function(response) {
          if(response.success) {
            $scope.jobs = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])


    .controller('JobDetailController', ['$scope', '$stateParams', 'Job',
      function($scope, $stateParams, Job) {
        Job.get({jobId: $stateParams.jobId}, function(response){
          $scope.loading = true
          if(response.success) {
            $scope.job = response.data
          } else {
            $scope.error = true
            $scope.message = response.message
          }
          $scope.loading = false
        })
      }
    ])

    .name
