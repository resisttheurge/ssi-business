import { ApiService } from 'utils'
export default class ShipmentItem extends ApiService {
  /*@ngInject*/
  constructor ($q, $unpack, $resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/shipment-items/:shipmentItemId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shipmentItemId: '' } }
      })

    var self = this;

    self.refresh = false;

    self.shipmentItemDateToString = shipmentItem => {
      const { shipDate } = shipmentItem
      return ({
          ...shipmentItem,
          shipDate: shipDate ? shipDate.toISOString().substring(0, 10) : undefined
        })
    }

    self.shipmentItemStringToDate = shipmentItem => {
      const { shipDate } = shipmentItem
      return ({
        ...shipmentItem,
        fieldDate: shipDate ? $convertDate.stringToDate(shipDate) : undefined
      })
    }

    this.get = shipmentItemId =>
      this.endpoint.get({ shipmentItemId }).$promise
        .then($unpack)
        .then(::this.shipmentItemStringToDate)

    this.create = item =>
      $q(
        (resolve, reject) =>
          item ?
            resolve(this.endpoint.create(self.shipmentItemDateToString(item)).$promise.then($unpack))
          : reject('cannot call create without a parameter')
      )

    self.update = function (item) {
        return $q(function (resolve, reject) {
          if (!item) {
            return reject('cannot update without a parameter')
          } else if (!item.id) {
            return reject('cannot update object with missing id')
          } else {
            return resolve(self.endpoint.update({ shipmentItemId: item.id }, self.shipmentItemDateToString(item)).$promise.then($unpack))
          }
        })
      }

    this.delete = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.delete({ shipmentItemId: item.id }, item).$promise.then($unpack))
          : reject('cannot call ShipmentItem.delete without a parameter')
      )

  }
}
