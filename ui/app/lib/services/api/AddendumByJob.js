import { ApiService } from 'utils'
export default class AddendumByJobService extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/jobs/:jobId/addenda', {}, {
      query: { method: 'GET' }
    })
  }
}
