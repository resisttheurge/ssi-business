import { ApiService } from 'utils'
export default class SystemType extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/system-types/:systemTypeId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ systemTypeId: '' } }
      })
  }
}
