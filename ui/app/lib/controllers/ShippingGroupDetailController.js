import { DetailController } from 'utils'

export default class ShippingGroupDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, ShippingGroup, enums, $ssiSelected,
    $mdDialog, $convertDate, $route, $location
  ) {
    super()

    var self = this

    $scope.job = $ssiSelected.job;

    $scope.tagTypes      = enums.tagTypes;

    $scope.addAddressLine = () =>
      $scope.shippingGroup ?
        $scope.shippingGroup.address ?
          $scope.shippingGroup.address.lines ?
            $scope.shippingGroup.address.lines = [
              ...$scope.shippingGroup.address.lines,
              {
                id: $scope.shippingGroup.address.lines.length,
                value: ''
              }]
          : $scope.shippingGroup.address.lines = [{ id: 0, value: '' }]
        : $scope.shippingGroup.address = { lines: [{ id: 0, value: '' }] }
      : $scope.shippingGroup = { address: { lines: [{ id: 0, value: '' }] } }

    function refresh() {
      console.log('refreshing')
      $scope.promise = $q.all({
        shippingGroup: ShippingGroup.get($routeParams.shippingGroupId),

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
      $scope.shippingGroup = { jobId: $scope.job.id, info: { address: { lines: [{ id: 0, value: '' }] } } }

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
