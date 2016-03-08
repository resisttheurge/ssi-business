export default class ShippingItemZoneByShippingItem {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/shipping-items/:shippingItemId/zones', {}, {
        query: { method: 'GET' }
      })
    }
  }
