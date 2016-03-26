import { ApiService } from 'utils'
export default class ShippingGroupshippingGroupItem extends ApiService {
  /*@ngInject*/
  constructor ($q, $unpack, $resource, endpoint) {
    super()
    this.endpoint = $resource(
      endpoint + '/shipping-group-shippingGroupItems/:shippingGroupshippingGroupItemId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shippingGroupshippingGroupItemId: '' } }
      })

    this.create = shippingGroupItem =>
      $q(
        (resolve, reject) =>
          shippingGroupItem ?
            resolve(this.endpoint.create(shippingGroupItem).$promise.then($unpack))
          : reject('cannot call create without a parameter')
      )
    var self = this;

    self.update = function (shippingGroupItem) {
          return $q(function (resolve, reject) {
            if (!shippingGroupItem) {
              return reject('cannot update without a parameter')
            } else if (!shippingGroupItem.id) {
              return reject('cannot update object with missing id')
            } else {
              return resolve(
                self.endpoint.update(
                  { shippingGroupshippingGroupItemId: shippingGroupItem.id },
                   shippingGroupItem).$promise.then($unpack))
            }
          })
        }

    self.delete = function (shippingGroupItem) {
        return $q(function (resolve, reject) {
          if (!shippingGroupItem) {
            return reject(
              'cannot call `shippingGroupItem.delete` without a shippingGroupItem parameter')
          } else if (!shippingGroupItem.id) {
            return reject(
              'cannot call `shippingGroupItem.delete` on a shippingGroupItem object missing an `id` value')
          } else {
            return resolve(self.endpoint.delete({ shippingGroupItemId: shippingGroupItem.id },
              self.shippingGroupItemDateToString(shippingGroupItem)).$promise.then($unpack))
          }
        })
      }
  }
}
