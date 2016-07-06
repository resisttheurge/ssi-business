import { ApiService } from 'utils'
export default class ShipmentItemByShipment extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/shipments/:shipmentId/items', {}, {
        query: { method: 'GET' }
      })
  }
}
