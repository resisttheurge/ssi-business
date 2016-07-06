import { ApiService } from 'utils'
export default class ZoneByJob extends ApiService {
  /*@ngInject*/
  constructor($resource, endpoint, $unpack) {
    super()
    this.endpoint = $resource(endpoint + '/jobs/:jobId/zones', {}, {
        query: { method: 'GET' }
      })

    this.list = jobId =>
      this.endpoint.query({ jobId }).$promise
        .then($unpack)
  }
}
