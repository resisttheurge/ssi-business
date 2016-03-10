import { ApiService } from 'utils'
export default class ShipmentByJob extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/jobs/:jobId/shipments', {}, {
        query: { method: 'GET' }
      })
  }
}
