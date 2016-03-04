'use strict'

var drawingDetailController = angular.module('drawingDetailController', [])

drawingDetailController.controller(
  'DrawingDetailController',
  [
    '$scope',
    '$routeParams',
    'SpecialtyItem',
    'selectionService',
    'enums',
 function($scope, $routeParams, Job, selectionService, specialtyItemService) {

        Drawing.get($scope, $scope.Drawing = {}, $routeParams.drawingId).then(function()
        {

          $scope.drawingTypes               = enums.drawingTypes

          $scope.revisionDateDisplay        = $scope.drawing.revisionDate && new Date($scope.job.revisionDate)
          $scope.startDateDisplay           = $scope.drawing.startDate && new Date($scope.job.startDate)
          $scope.shopDateDisplay            = $scope.drawing.shopDate && new Date($scope.job.shopDate)
          $scope.fieldDateDisplay           = $scope.job.fieldDate && new Date($scope.job.fieldDate)
          $scope.requestDateDisplay         = $scope.job.requestDate && new Date($scope.job.requestDate)
        });


      }
    ])
