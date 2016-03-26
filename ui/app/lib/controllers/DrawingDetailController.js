import { DetailController } from 'utils'

export default class DrawingDetailController extends DetailController {
  /*@ngInject*/
   constructor($scope, $routeParams, $q, Drawing, SpecialtyItem, enums,
      $ssiSelected, $mdDialog, $convertDate, $route, $location) {
     super()
     var self = this

     $scope.job = $ssiSelected.job;

     $scope.tagTypes      = enums.tagTypes;
     $scope.drawingTypes  = enums.drawingTypes;

     $scope.addAddressLine = () =>
       $scope.drawing ?
         $scope.drawing.address ?
           $scope.drawing.address.lines ?
             $scope.drawing.address.lines = [
               ...$scope.drawing.address.lines,
               {
                 id: $scope.drawing.address.lines.length,
                 value: ''
               }]
           : $scope.drawing.address.lines = [{ id: 0, value: '' }]
         : $scope.drawing.address = { lines: [{ id: 0, value: '' }] }
       : $scope.drawing = { address: { lines: [{ id: 0, value: '' }] } }

     function refresh() {
       console.log('refreshing')
       $scope.promise = $q.all({
         drawing: Drawing.get($routeParams.drawingId),

         //  specialtyItem: SpecialtyItem.endpoint.query().$promise.then(unpack),
       }).then(function (data) {
         console.log('extending')

         angular.extend($scope, data, {
           loading: false
         })

         return data
         console.log('extending done')
       })
     }

     if ($routeParams.drawingId) {
       $scope.drawing = $ssiSelected.drawing;

       $scope.update = function update(item)
       {
         if (item.jobId &&
             item.label &&
             item.drawingType) {
           Drawing.update(item).then(function (data) { $mdDialog
             .show($mdDialog.alert()
             .title('Changes Saved!')
             .textContent('Changes to this record have been saved')
             .ok('Close')).then(() => $route.reload());
           }, function (error) { $mdDialog
             .show($mdDialog.alert()
             .title('Failed to Save')
             .textContent('There has been an error, changes have not been saved')
           .ok('Close'))});
         } else {
           $mdDialog
            .show($mdDialog.alert()
            .title('Failed to Save')
            .textContent('Invalid data')
          .ok('Close'))
         }

       }

       refresh()
     } else {
       $scope.drawing = { jobId: $scope.job.id, info: { address: { lines: [{ id: 0, value: '' }] } } }

       $scope.create = drawing =>
       {
         if (
           drawing.jobId &&
           drawing.label &&
           drawing.drawingType
         ) {
           Drawing.create(drawing)
           .then(
             data =>
               $mdDialog.show(
                 $mdDialog.alert()
                   .title('Record created!')
                   .textContent('This record has been saved to the database')
                   .ok('Close')
               ).then(() => $location.url(`/drawings/${data.id}`)),
             error => {
               $log.error(JSON.stringify(error))
               $mdDialog.show(
                 $mdDialog.alert()
                   .title('Failed to create record')
                   .textContent('There has been an error, record could not be created')
                   .ok('Close')
               )
             }
           )
         } else {
           $mdDialog
            .show($mdDialog.alert()
            .title('Failed to Save')
            .textContent('Invalid data')
          .ok('Close'))
         }
       }
     }

   }
}
