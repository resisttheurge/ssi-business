import { ApiService } from 'utils'
export default class ShippingGroupItem extends ApiService {
  /*@ngInject*/
  constructor ($q, $unpack, $resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/shipping-group-items/:shippingGroupItemId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shippingGroupItemId: '' } }
      })

    this.create = item =>
      $q(
        (resolve, reject) =>
          item ?
            resolve(this.endpoint.create(item).$promise.then($unpack))
          : reject('cannot call create without a parameter')
      )
    var self = this;

    self.update = function (item) {
          return $q(function (resolve, reject) {
            if (!item) {
              return reject('cannot update without a parameter')
            } else if (!item.id) {
              return reject('cannot update object with missing id')
            } else {
              return resolve(self.endpoint.update({ shippingGroupItemId: item.id }, item).$promise.then($unpack))
            }
          })
        }
  }
}
