import { ApiService } from 'utils'
export default class PartOrderByJob extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/jobs/:jobId/part-orders', {}, {
        query: { method: 'GET' }
      })
  }
}
