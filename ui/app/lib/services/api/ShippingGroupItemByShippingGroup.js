export default class ShippingGroupItemByShippingGroup {
  /*@ngInject*/
  constructor ($resource, endpoint) {
      this.endpoint = $resource(endpoint + '/shipping-groups/:shippingGroupId/items', {}, {
        query: { method: 'GET' }
      })
    }
  }
