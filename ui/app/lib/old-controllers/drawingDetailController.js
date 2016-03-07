'use strict'

export default angular.module('drawingDetailController', [])

  .controller(
    'DrawingDetailController',
    [
      '$scope',
      '$routeParams',
      '$q',
      'Drawing',
      'SpecialtyItem',
      'selectionService',
      'enums',
   function ($scope, $routeParams, $q, Drawing, selectionService, SpecialtyItem, enums) {
     var self = this
     var promises = []

     //
     function resolve() {
       if (!promises.length) {
         return $scope.$applyAsync()
       }

       promises[0].then(function () {
         promises.shift()
         resolve()
       })
     }

     function queue(promise) {
       if (!promise) {
         return
       }

       if (promises.push(angular.isArray(promise) ? $q.all(promise) : $q.when(promise)) === 1) {
         resolve()
       }
     }

     function unpack(response) {
       return $q(function (resolve, reject) {
         if (response) {
           if (response.success) {
             return resolve(response.data)
           } else {
             return reject(response.message ? response.message : 'API response failed')
           }
         } else {
           return reject('API response was undefined')
         }
       })
     }

     function refresh() {
       console.log('refreshing')
       $scope.promise = $q.all({
         drawing: Drawing.endpoint.get($routeParams).$promise.then(unpack),

        //  specialtyItem: SpecialtyItem.endpoint.query().$promise.then(unpack),
       }).then(function (data) {
         console.log('extending')

         angular.extend($scope, data, {
           revisionDateDisplay: data.drawing.revisionDate && new Date(data.drawing.revisionDate),
           startDateDisplay: data.drawing.startDate && new Date(data.drawing.startDate),
           dueDateDisplay: data.drawing.dueDate && new Date(data.drawing.dueDate),
           completeDateDisplay: data.drawing.completeDate && new Date(data.drawing.completeDate),
           loading: false
         })
         console.log('extending done')
       })
     }

     $scope.drawingTypes = enums.drawingTypes;
     $scope.$watch('promise', queue)
     refresh()

     //
     // Drawing.get($scope, $scope.Drawing = {}, $routeParams.drawingId).then(function()
     // {
     //
     // })
     //   $scope.drawingTypes               = enums.drawingTypes
     //
     //   $scope.revisionDateDisplay        = $scope.drawing.revisionDate && new Date($scope.drawing.revisionDate)
     //   $scope.startDateDisplay           = $scope.drawing.startDate && new Date($scope.drawing.startDate)
     //   $scope.shopDateDisplay            = $scope.drawing.shopDate && new Date($scope.drawing.shopDate)
     //   $scope.fieldDateDisplay           = $scope.drawing.fieldDate && new Date($scope.drawing.fieldDate)
     //   $scope.requestDateDisplay         = $scope.drawing.requestDate && new Date($scope.drawing.requestDate)
     // });
     //
     //
     // }
   }

   ])

   .name
