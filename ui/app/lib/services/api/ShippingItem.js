import { ApiService } from 'utils'
export default class ShippingItem extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/shipping-items/:shippingItemId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shippingItemId: '' } }
      })
  }
}
