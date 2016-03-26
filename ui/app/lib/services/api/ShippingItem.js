import { ApiService } from 'utils'
export default class ShippingItem extends ApiService {
  /*@ngInject*/
  constructor ($q, $unpack, $resource, endpoint) {
    super()

    var self = this;

    this.endpoint = $resource(endpoint + '/shipping-items/:shippingItemId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shippingItemId: '' } }
      })

    self.create = item =>
      $q(
        (resolve, reject) =>
            resolve(this.endpoint.create(item).$promise.then($unpack))

      )

    this.delete = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.delete({ shippingItemId: item.id }, item).$promise.then($unpack))
          : reject('cannot call shippingItem.delete without a parameter')
      )

    self.update = function (shippingItem) {
        return $q(function (resolve, reject) {
          if (!shippingItem) {
            return reject('cannot update without a parameter')
          } else if (!shippingItem.id) {
            return reject('cannot update object with missing id')
          } else {
            return resolve(self.endpoint.update({ shippingItemId: shippingItem.id }, shippingItem).$promise.then($unpack))
          }
        })
      }

  }
}
