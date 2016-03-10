import { ApiService } from 'utils'
export default class ShippingItemZoneByShippingItem extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/shipping-items/:shippingItemId/zones', {}, {
        query: { method: 'GET' }
      })
  }
}
