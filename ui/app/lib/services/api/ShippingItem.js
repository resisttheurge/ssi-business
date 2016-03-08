export default class ShippingItem {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/shipping-items/:shippingItemId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shippingItemId: '' } }
      })
    }
  }
