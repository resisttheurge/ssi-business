export default class ShippingItemZone {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/shipping-item-zones/:shippingItemZoneId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shippingItemZoneId: '' } }
      })
    }
}
