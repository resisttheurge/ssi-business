import { ApiService } from 'utils'
export default class ShippingGroupItem extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/shipping-group-items/:shippingGroupItemId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shippingGroupItemId: '' } }
      })
  }
}
