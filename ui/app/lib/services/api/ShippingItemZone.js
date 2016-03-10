import { ApiService } from 'utils'
export default class ShippingItemZone extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/shipping-item-zones/:shippingItemZoneId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shippingItemZoneId: '' } }
      })
  }
}
