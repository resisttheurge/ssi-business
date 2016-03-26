import { DetailController } from 'utils'

export default class MarkDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, Mark, enums, $ssiSelected, $mdDialog) {
    super()

    $scope.shippingItemStatuses = enums.shippingItemStatuses
    $scope.drawing = $ssiSelected.drawing;
    $scope.job = $ssiSelected.job;

    // Mark.endpoint.get($routeParams, function (response) {
    //   $scope.loading = true
    //   if (response.success) {
    //     $scope.mark = response.data
    //   } else {
    //     $scope.error = true
    //     $scope.message = response.message
    //   }
    //
    //   $scope.loading = false
    // })

    function refresh() {
      console.log('refreshing')
      $scope.promise = Mark.get($routeParams.markId)
         .then(function (data) {
          $scope.mark = data
          $log.debug()
          return data
        })
    }

    if ($routeParams.markId) {

      $scope.update = function update(item)
      {
        if (item.label) {
          Mark.update(item).then(function (data) { $mdDialog
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

      $scope.create = mark =>
    {
      {
        Mark.create(mark)
        .then(
          data =>
            $mdDialog.show(
              $mdDialog.alert()
                .title('Record created!')
                .textContent('This record has been saved to the database')
                .ok('Close')
            ).then(
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
      )
      }
    }
    }

  }
}
