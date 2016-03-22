import { DetailController } from 'utils'

export default class DrawingDetailController extends DetailController {
  /*@ngInject*/
   constructor($scope, $routeParams, $q, Drawing, SpecialtyItem, enums,
      $ssiSelected, $mdDialog, $convertDate) {
     super()
     var self = this
     var promises = []

     $scope.job = $ssiSelected.job;
     $scope.drawing = $ssiSelected.drawing;

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
           loading: false
         })

         return data
         console.log('extending done')
       }).then(convertDate)
     }

     function convertDate(data) {
       return $q(function (resolve, reject) {
         console.log('converting Dates')

         $scope.revisionDateDisplay = data.drawing.info.revisionDate != null ?
          $convertDate.stringToDate(data.drawing.info.revisionDate) : undefined

         $scope.startDateDisplay = data.drawing.info.startDate != null ?
          $convertDate.stringToDate(data.drawing.info.startDate) : undefined

         $scope.shopDateDisplay = data.drawing.info.shopDate != null ?
            $convertDate.stringToDate(data.drawing.info.shopDate) : undefined

         $scope.dueDateDisplay = data.drawing.info.dueDate != null ?
          $convertDate.stringToDate(data.drawing.info.dueDate) : undefined

         $scope.completeDateDisplay = data.drawing.info.completeDate != null ?
          $convertDate.stringToDate(data.drawing.info.completeDate) : undefined

         return resolve(data)
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

     $scope.tagTypes      = enums.tagTypes;
     $scope.drawingTypes  = enums.drawingTypes;

     $scope.$watch('promise', queue)
     refresh()
   }
}
