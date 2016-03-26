import { DetailController } from 'utils'

export default class ShippingGroupDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, ShippingGroup, enums, $ssiSelected,
    $mdDialog, $convertDate, $route, $location, $log
  ) {
    super()

    var self = this

    $scope.job = $ssiSelected.job;

    $scope.tagTypes      = enums.tagTypes;

    $scope.addAddressLine = () =>
      $scope.shippingGroup ?
       $scope.shippingGroup.info ?
        $scope.shippingGroup.info.address ?
          $scope.shippingGroup.info.address.lines ?
            $scope.shippingGroup.info.address.lines = [
              ...$scope.shippingGroup.info.address.lines,
              {
                id: $scope.shippingGroup.info.address.lines.length,
                value: ''
              }]
          : $scope.shippingGroup.info.address.lines = [{ id: 0, value: '' }]
        : $scope.shippingGroup.info.address = { lines: [{ id: 0, value: '' }] }
      : $scope.shippingGroup.info = { address: { lines: [{ id: 0, value: '' }] } }
    : $scope.shippingGroup = { info: { address: { lines: [{ id: 0, value: '' }] } } }

    function refresh() {
      console.log('refreshing')
      $scope.promise = $q.all(ShippingGroup.get($routeParams.shippingGroupId))
        .then(function (data) {
          $scope.shippingGroup = data
          return data
        })
    }

    if ($routeParams.shippingGroupId) {
      $scope.shippingGroup = $ssiSelected.shippingGroup;

      $scope.update = function update(item)
      {
        if (item.jobId &&
            item.label) {
          ShippingGroup.update(item).then(function (data) { $mdDialog
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
      $scope.shippingGroup = { jobId: $scope.job.id, rush: false, info: { address: { lines: [{ id: 0, value: '' }] } } }

      $scope.create = sg =>
      {
        if (
          sg.jobId &&
          sg.label
        ) {
          ShippingGroup.create(sg)
          .then(
            data =>
              $mdDialog.show(
                $mdDialog.alert()
                  .title('Record created!')
                  .textContent('This record has been saved to the database')
                  .ok('Close')
              ).then(() => $location.url(`/shipping-groups/${data.id}`)),
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
