import { DetailController } from 'utils'

export default class ShippingGroupDetailController extends DetailController {
  /*@ngInject*/
  constructor($scope, $routeParams, ShippingGroup, enums, $ssiSelected,
    $mdDialog, $convertDate, $route, $location, $log, $q, SpecialtyItem, Carrier,
    Shop
  ) {
    super()

    var self = this

    $scope.job = $ssiSelected.job;
    $scope.tagTypes      = enums.tagTypes;
    $scope.shopDate = new Date();

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

    if ($routeParams.shippingGroupId) {
      this.refresh = () =>
      $scope.promise = $q.all({
        shippingGroup: ShippingGroup.get($routeParams.shippingGroupId),
        specialtyItems: SpecialtyItem.list(),
        shops: Shop.list(),
        carriers: Carrier.list()
      }).then(({ specialtyItems, shops, carriers }) => {
        $scope.specialtyItems = specialtyItems
        $scope.shops = shops
        $scope.carriers = carriers
      }).then(() => $scope.loading = false)

      $scope.shippingGroup = $ssiSelected.shippingGroup;

      $scope.update = function update(item)
      {
        if (item.jobId &&
            item.label &&
            item.rush !== undefined
          ) {
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

      $scope.shippingGroup = { jobId: $ssiSelected.job.id, rush: false, info: { address: { lines: [{ id: 0, value: '' }] } } }

      $scope.create = sg =>
      {
        if (
          sg.jobId &&
          sg.label &&
          sg.rush !== undefined
        ) {
          ShippingGroup.create(sg)
          .then(
            data =>
              $mdDialog.show(
                $mdDialog.alert()
                  .title('Record created!')
                  .textContent('This record has been saved to the database')
                  .ok('Close')
              ).then(() => {
                $ssiSelected.shippingGroup = data
                $location.path(`/jobs/${$ssiSelected.job.id}/shipping-groups/${data.id}`)
              }),
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
    $scope.shippingGroup.info.tagType = 'S';

  }

}
