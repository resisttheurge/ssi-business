import { ApiService } from 'utils'
export default class Carrier extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/carriers/:carrierId', {}, {
      create: { method: 'POST' },
      update: { method: 'PATCH' },
      query: { method: 'GET', params:{ carrierId: '' } }
    })
  }
}
