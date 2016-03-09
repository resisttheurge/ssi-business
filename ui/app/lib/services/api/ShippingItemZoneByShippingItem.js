export default class ShippingItemZoneByShippingItem {
  /*@ngInject*/
  constructor ($resource, endpoint) {
      this.endpoint = $resource(endpoint + '/shipping-items/:shippingItemId/zones', {}, {
        query: { method: 'GET' }
      })
    }
  }
