import { DetailController } from 'utils'

export default class PartOrderDetailController extends DetailController {
  /*@ngInject*/
  constructor($mdDialog, $scope, $routeParams, PartOrder, enums, $ssiSelected, $convertDate) {
    super()
    if ($routeParams.partOrderId) {

      $scope.partOrderStatuses = enums.partOrderStatuses
      $scope.partTypes = enums.partTypes
      $scope.job = $ssiSelected.job;
      $scope.partOrder = $ssiSelected.partOrder;

      PartOrder.endpoint.get({ partOrderId: $routeParams.partOrderId }, function (response) {
        $scope.loading = true
        if (response.success) {
          $scope.partOrder = response.data
        } else {
          $scope.error = true
          $scope.message = response.message
        }

        //      $scope.partOrder.requestDateDisplay?
        $scope.requestDateDisplay = $scope.partOrder.requestDate != null ?
         $convertDate.stringToDate($scope.partOrder.requestDate) : undefined

        $scope.purchaseDateDisplay = $scope.partOrder.purchaseDate != null ?
         $convertDate.stringToDate($scope.partOrder.purchaseDate) : undefined

        $scope.releaseDateDisplay = $scope.partOrder.releaseDate != null ?
           $convertDate.stringToDate($scope.partOrder.releaseDate) : undefined

        $scope.loading = false
      }
    )
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
            .ok('Close'));
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

    } else {
      $scope.create = item =>
        PartOrder.create(item).then(
          data =>
            $mdDialog.show(
              $mdDialog.alert()
                .title('Record created!')
                .textContent('This record has been saved to the database')
                .ok('Close')
            ),
          error =>
            $mdDialog.show(
              $mdDialog.alert()
                .title('Failed to create record')
                .textContent('There has been an error, record could not be created')
                .ok('Close')
            )
        )
    }
  }
}
