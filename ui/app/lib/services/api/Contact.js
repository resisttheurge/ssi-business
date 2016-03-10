import { ApiService } from 'utils'
export default class Contact extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/contacts/:contactId', {}, {
      create: { method: 'POST' },
      update: { method: 'PATCH' },
      query: { method: 'GET', params:{ contactId: '' } }
    })
  }
}
