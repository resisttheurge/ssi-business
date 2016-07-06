import { ApiService } from 'utils'
export default class ShippingGroupItemByShippingGroup extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint, $unpack) {
    super()
    this.endpoint = $resource(endpoint + '/shipping-groups/:shippingGroupId/items', {}, {
        query: { method: 'GET' }
      })

    this.list = shippingGroupId =>
      this.endpoint.query({ shippingGroupId }).$promise
        .then($unpack)
  }
}
