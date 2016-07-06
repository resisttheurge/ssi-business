import { ApiService } from 'utils'

export default class Addendum extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/addenda/:addendumId', {}, {
      create: { method: 'POST' },
      update: { method: 'PATCH' },
      query: { method: 'GET', params:{ addendumId: '' } }
    })
  }
}
