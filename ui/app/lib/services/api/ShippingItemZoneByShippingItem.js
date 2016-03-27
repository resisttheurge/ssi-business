import { ApiService } from 'utils'
export default class ShippingItemZoneByShippingItem extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint, $unpack) {
    super()
    this.endpoint = $resource(endpoint + '/shipping-items/:shippingItemId/zones', {}, {
        query: { method: 'GET' }
      })

    this.list = shippingItemId =>
      this.endpoint.query({ shippingItemId }).$promise
        .then($unpack)
  }
}
