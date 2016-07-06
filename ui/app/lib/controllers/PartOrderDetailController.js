import { DetailController } from 'utils'

export default class PartOrderDetailController extends DetailController {
  /*@ngInject*/
  constructor(
    $mdDialog, $scope, $routeParams, Manufacturer, PartOrder, Vendor,
    enums, $ssiSelected, $convertDate, $q, DrawingByJob, $log, $route, $location
  ) {
    super()
    $scope.loading = true
    $scope.partOrderStatuses = enums.partOrderStatuses
    $scope.partTypes = enums.partTypes
    $scope.job = $ssiSelected.job

    if ($routeParams.partOrderId) {

      this.refresh = () =>
        $q.all({
          partOrder: PartOrder.get($routeParams.partOrderId),
          vendors: Vendor.list(),
          manufacturers: Manufacturer.list(),
          drawings: DrawingByJob.list($scope.job.id)
        }).then(({ partOrder, parts, vendors, manufacturers, drawings }) => {
          $log.debug(JSON.stringify(partOrder))
          $scope.partOrder = partOrder
          $scope.parts = parts
          $scope.vendors = vendors
          $scope.manufacturers = manufacturers
          $scope.drawings = drawings
        }).then(() => $scope.loading = false)

      $scope.update = function update(item)
      {
        if (item.requestedQuantity &&
            item.stockQuantity &&
            item.purchaseQuantity) {
          PartOrder.update(item).then(function (data) { $mdDialog
            .show($mdDialog
            .alert()
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
        $q.all({
          vendors: Vendor.list(),
          manufacturers: Manufacturer.list(),
          drawings: DrawingByJob.list($scope.job.id)
        }).then(({ parts, vendors, manufacturers, drawings }) => {
          $scope.parts = parts
          $scope.vendors = vendors
          $scope.manufacturers = manufacturers
          $scope.drawings = drawings
        }).then(() => $scope.loading = false)

      $scope.partOrder = { jobId: $scope.job.id, status: 'ACTIVE', ...$ssiSelected.partOrder }

      $scope.create = item => {
        if (
          item.requestedQuantity >= 0 &&
          item.stockQuantity >= 0 &&
          item.purchaseQuantity >= 0
        ) {
          PartOrder.create(item).then(
            data =>
              $mdDialog.show(
                $mdDialog.alert()
                  .title('Record created!')
                  .textContent('This record has been saved to the database')
                  .ok('Close')
              ).then(() => $location.path(`/jobs/${$ssiSelected.job.id}/part-orders/${data.id}`)),
            error =>
              $mdDialog.show(
                $mdDialog.alert()
                  .title('Failed to create record')
                  .textContent('There has been an error, record could not be created')
                  .ok('Close')
              )
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
