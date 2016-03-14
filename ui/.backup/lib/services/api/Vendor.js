import { ApiService } from 'utils'
export default class Vendor extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/vendors/:vendorId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ vendorId: '' } }
      })
  }
}
