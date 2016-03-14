import { ApiService } from 'utils'
export default class ShipmentItem extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/shipment-items/:shipmentItemId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shipmentItemId: '' } }
      })
  }
}
