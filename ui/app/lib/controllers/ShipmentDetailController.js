import { DetailController } from 'utils'

export default class ShipmentDetailController extends DetailController {
  /*@ngInject*/
  constructor($q, $scope, $routeParams, Shipment, enums, $ssiSelected, $mdDialog,
    $convertDate, $log, Shop, Carrier, $location, $route
  ) {
    super()

    $scope.shipmentStatuses = enums.shipmentStatuses

    $scope.job = $ssiSelected.job
    $scope.loading = true

    $scope.addAddressLine = () =>
      $scope.shipment ?
        $scope.shipment.address ?
          $scope.shipment.address.lines ?
            $scope.shipment.address.lines = [
              ...$scope.shipment.address.lines,
              {
                id: $scope.shipment.address.lines.length,
                value: ''
              }]
          : $scope.shipment.address.lines = [{ id: 0, value: '' }]
        : $scope.shipment.address = { lines: [{ id: 0, value: '' }] }
      : $scope.shipment = { address: { lines: [{ id: 0, value: '' }] } }

    if ($routeParams.shipmentId) {

      this.refresh = () =>
        $q.all({
          shipment: Shipment.get($routeParams.shipmentId),
          shops: Shop.list(),
          carriers: Carrier.list()
        }).then(
          ({ shipment, shops, carriers }) => {
            $scope.shipment = shipment
            $scope.shops = shops
            $scope.carriers = carriers
          }
        ).then(() => $scope.loading = false)

      $scope.loading = true

      $scope.update = function update(item)
      {
        if (
          item.jobId &&
          item.weight !== undefined &&
          item.status &&
          item.number !== undefined
        ) {
          Shipment.update(item).then(function (data) { $mdDialog
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
        $q.all({
          shops: Shop.list(),
          carriers: Carrier.list()
        }).then(
          ({ shops, carriers }) => {
            $scope.shops = shops
            $scope.carriers = carriers
          }
        ).then(() => $scope.loading = false)

      $scope.shipment = { jobId: $scope.job.id, status: 'ACTIVE', weight: 0, address: { lines: [{ id: 0, value: '' }] } }

      $scope.create = shipment => {
        if (
          shipment.jobId &&
          shipment.weight !== undefined &&
          shipment.status &&
          shipment.number !== undefined
        ) {
          Shipment.create(shipment).then(
            data =>
              $mdDialog.show(
                $mdDialog.alert()
                  .title('Record created!')
                  .textContent('This record has been saved to the database')
                  .ok('Close')
              )
              .then(() => $ssiSelected.shipment = data)
              .then(() => $location.path(`/jobs/${$ssiSelected.job.id}/shipments/${data.id}`)),
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
          $mdDialog.show(
            $mdDialog.alert()
             .title('Failed to Save')
             .textContent('Invalid data')
            .ok('Close')
          )
        }
      }

      this.refresh()
    }

    $scope.addPrompt = function (event) {
      $mdDialog.show({
        clickOutsideToClose: true,
        scope: $scope,
        preserveScope: true,
        template: `<md-dialog-content>

          <form name="shipmentItemDetailForm" flex style="overflow-x : hidden" ng-hide="loading">
            <div layout="column" layout-margin>
              <div layout="row">
                <md-input-container flex>
                  <label>Shipping Item</label>
                  <md-select
                      required
                      ng-model="shipmentItem.shippingItem"
                      placeholder="Shipping Item"
                      ng-model-options="{trackBy: '$value.id'}">
                    <md-optgroup
                        label="Drawings">
                      <md-optgroup
                          ng-repeat="drawing in shippingItemCollection.drawings track by drawing.id"
                          label="{{drawing.label}}{{drawing.info.title ? ' - ' + drawing.info.title : ''}}">
                        <md-option
                            ng-repeat="mark in drawing.marks track by mark.id"
                            ng-value="mark.shippingItem">
                          {{mark.label}}{{mark.shippingItem.label ? ' - ' + mark.shippingItem.label : ''}}<strong>{{"  (" + mark.shippingItem.completed + "/" + mark.shippingItem.requested + ")"}}</strong>
                        </md-option>
                      </md-optgroup>
                    </md-optgroup>
                    <md-optgroup
                        label="Shipping Groups">
                      <md-optgroup
                          ng-repeat="shippingGroup in shippingItemCollection.shippingGroups track by shippingGroup.id"
                          label="{{shippingGroup.label}}{{shippingGroup.info.title ? ' - ' + shippingGroup.info.title : ''}}">
                        <md-option
                            ng-repeat="shippingGroupItem in shippingGroup.shippingGroupItems track by shippingGroupItem.id"
                            ng-value="shippingGroupItem.shippingItem">
                          {{shippingGroupItem.label}}{{shippingGroupItem.shippingItem.label ? ' - ' + shippingGroupItem.shippingItem.label : ''}}<strong>{{"  (" + shippingGroupItem.shippingItem.completed + "/" + shippingGroupItem.shippingItem.requested + ")"}}</strong>
                        </md-option>
                      </md-optgroup>
                    </md-optgroup>
                  </md-select>
                </md-input-container>
              </div>

              <div layout="row">
                <md-input-container flex>
                  <label>Quantity</label>
                  <input min="0" ng-model="shipmentItem.quantity" type="number" required></textarea>
                </md-input-container>
              </div>
            </div>

            <section layout="row" layout-sm="column" layout-align="center center" layout-wrap>
               <md-button class="md-raised md-primary" ng-disabled="shipmentItemDetailForm.$invalid" ng-click="done()">Done</md-button>
               <md-button class="md-raised md-warn" ng-click="cancel()">Cancel</md-button>
            </section>

          </form>

            </md-dialog-content>`,
        controller: function AddShipmentItemController($scope, $routeParams, ShipmentItem, ShippingItemByJob, enums, $mdDialog, $ssiSelected, $log, $location) {

          $scope.shippingItemStatuses = enums.shippingItemStatuses

          $scope.shipment = $ssiSelected.shipment
          $scope.job = $ssiSelected.job

          ShippingItemByJob.list($routeParams)
            .then(collection => ({
              ...collection,
              drawings:
                collection.drawings
                  .map(drawing => ({
                    ...drawing,
                    marks: drawing.marks.filter(
                      mark =>
                        mark.shippingItem.status !== 'SHPD'
                          && !(mark.shippingItem.requested < 1)
                          && !(mark.shippingItem.completed === mark.shippingItem.requested)
                    )
                  }))
                  .filter(drawing => drawing.marks.length > 0),
              shippingGroups:
                collection.shippingGroups
                  .map(shippingGroup => ({
                    ...shippingGroup,
                    marks: shippingGroup.shippingGroupItems.filter(
                      shippingGroupItem =>
                        shippingGroupItem.shippingItem.status !== 'SHPD'
                          && !(shippingGroupItem.shippingItem.requested < 1)
                          && !(shippingGroupItem.shippingItem.completed === shippingGroupItem.shippingItem.requested)
                    )
                  }))
                  .filter(shippingGroup => shippingGroup.shippingGroupItems.length > 0)

            }))
            .then(collection => $scope.shippingItemCollection = collection);

          $scope.shipmentItem = { shipmentId: $scope.shipment.id }

          $scope.create = shipmentItem => {
            ShipmentItem.create(shipmentItem)
            .then(
              data =>
                $mdDialog.show(
                  $mdDialog.alert()
                    .title('Record created!')
                    .textContent('This record has been saved to the database')
                    .ok('Close')
                )
                .then(() => {
                  $ssiSelected.shipmentItem = data
                  ShipmentItem.refresh = true
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
          }

          $scope.done = function () {
            $scope.create($scope.shipmentItem);
          }

          $scope.cancel = function () {
            $mdDialog.hide();
          }

        }
      });
    };

  }
}
