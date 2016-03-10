import { ApiService } from 'utils'
export default class ZoneByJob extends ApiService {
  /*@ngInject*/
  constructor($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/jobs/:jobId/zones', {}, {
        query: { method: 'GET' }
      })
  }
}
