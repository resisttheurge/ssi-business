import { ApiService } from 'utils'
export default class ShippingGroupItemByShippingGroup extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/shipping-groups/:shippingGroupId/items', {}, {
        query: { method: 'GET' }
      })
  }
}
