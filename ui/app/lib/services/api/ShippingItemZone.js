export default class ShippingItemZone {
  /*@ngInject*/
  constructor ($resource, endpoint) {
      this.endpoint = $resource(endpoint + '/shipping-item-zones/:shippingItemZoneId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shippingItemZoneId: '' } }
      })
    }
}
