export default class ShippingGroupItemByShippingGroup {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/shipping-groups/:shippingGroupId/items', {}, {
        query: { method: 'GET' }
      })
    }
  }
