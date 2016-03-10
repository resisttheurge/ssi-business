import { ApiService } from 'utils'
export default class SystemTypeByJob extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/jobs/:jobId/system-types', {}, {
        add: { method: 'POST' },
        remove: { method: 'DELETE' },
        query: { method: 'GET' }
      })
  }
}
