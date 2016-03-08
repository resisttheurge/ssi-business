export default class ShippingGroupItem {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/shipping-group-items/:shippingGroupItemId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shippingGroupItemId: '' } }
      })
    }
  }
