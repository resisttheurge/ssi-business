import { DetailController } from 'utils'

export default class DrawingDetailController extends DetailController {
  /*@ngInject*/
   constructor($scope, $routeParams, $q, Drawing, SpecialtyItem, enums, $ssiSelected, $mdDialog) {
     super()
     var self = this
     var promises = []

     $scope.job = $ssiSelected.job;

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

     $scope.update = function update(item)
     {
       Drawing.update(item).then(function (data) { $mdDialog
         .show($mdDialog.alert()
         .title('Changes Saved!')
         .textContent('Changes to this record have been saved')
         .ok('Close'));
       }, function (error) { $mdDialog
         .show($mdDialog.alert()
         .title('Failed to Save')
         .textContent('There has been an error, changes have not been saved')
       .ok('Close'))});
     }

     $scope.drawingTypes = enums.drawingTypes;
     $scope.$watch('promise', queue)
     refresh()
   }
}
