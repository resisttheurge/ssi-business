import { ApiService } from 'utils'
export default class PartOrder extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/part-orders/:partOrderId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ partOrderId: '' } }
      })
  }
}
