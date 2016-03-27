import { DetailController } from 'utils'

export default class DrawingDetailController extends DetailController {
  /*@ngInject*/
   constructor($log, $scope, $routeParams, $q, Drawing, SpecialtyItem, enums,
      $ssiSelected, $mdDialog, $convertDate, $route, $location, Shop, Carrier) {
     super()
     var self = this

     $scope.job = $ssiSelected.job;
     $scope.loading = true

     $scope.tagTypes      = enums.tagTypes;
     $scope.drawingTypes  = enums.drawingTypes;

     $scope.addAddressLine = () =>
       $scope.drawing ?
        $scope.drawing.info ?
         $scope.drawing.info.address ?
           $scope.drawing.info.address.lines ?
             $scope.drawing.info.address.lines = [
               ...$scope.drawing.info.address.lines,
               {
                 id: $scope.drawing.info.address.lines.length,
                 value: ''
               }]
           : $scope.drawing.info.address.lines = [{ id: 0, value: '' }]
         : $scope.drawing.info.address = { lines: [{ id: 0, value: '' }] }
       : $scope.drawing.info = { address: { lines: [{ id: 0, value: '' }] } }
     : $scope.drawing = { info: { address: { lines: [{ id: 0, value: '' }] } } }

     if ($routeParams.drawingId) {

       this.refresh = () =>
         $scope.promise = $q.all({
           drawing: Drawing.get($routeParams.drawingId),
           specialtyItems: SpecialtyItem.list(),
           shops: Shop.list(),
           carriers: Carrier.list()
         }).then(({ drawing, specialtyItems, shops, carriers }) => {
           $scope.drawing = drawing
           $scope.specialtyItems = specialtyItems
           $scope.shops = shops
           $scope.carriers = carriers
         }).then(() => $scope.loading = false)

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

       this.refresh()
     } else {
       this.refresh = () =>
       $scope.promise = $q.all({
         specialtyItems: SpecialtyItem.list(),
         shops: Shop.list(),
         carriers: Carrier.list()
       }).then(({ specialtyItems, shops, carriers }) => {
         $scope.specialtyItems = specialtyItems
         $scope.shops = shops
         $scope.carriers = carriers
       }).then(() => $scope.loading = false)

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
               ).then(() => $location.path(`/drawings/${data.id}`)),
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

       this.refresh()

     }

   }
}
