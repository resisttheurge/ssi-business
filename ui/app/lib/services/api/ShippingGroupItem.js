export default class ShippingGroupItem {
  /*@ngInject*/
  constructor ($resource, endpoint) {
      this.endpoint = $resource(endpoint + '/shipping-group-items/:shippingGroupItemId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shippingGroupItemId: '' } }
      })
    }
  }
