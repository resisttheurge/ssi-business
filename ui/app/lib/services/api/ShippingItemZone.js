import { ApiService } from 'utils'
export default class ShippingItemZone extends ApiService {
  /*@ngInject*/
  constructor ($q, $unpack, $resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/shipping-item-zones/:shippingItemZoneId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shippingItemZoneId: '' } }
      })

    this.get = shippingItemZoneId =>
      this.endpoint.get({ shippingItemZoneId }).$promise
        .then($unpack)

    this.update = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.update({ shippingItemZoneId: item.id }, item).$promise.then($unpack))
          : reject('cannot call update without a parameter')
      )

    this.create = item =>
      $q(
        (resolve, reject) =>
          item ?
            resolve(this.endpoint.create(item).$promise.then($unpack))
          : reject('cannot call create without a parameter')
      )

    this.delete = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.delete({ shippingItemZoneId: item.id }).$promise.then($unpack))
          : reject('cannot call update without a parameter')
      )
  }
}
