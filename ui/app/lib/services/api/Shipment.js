import { ApiService } from 'utils'
export default class Shipment extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/shipments/:shipmentId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shipmentId: '' } }
      })
  }
}
