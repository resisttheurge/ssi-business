export default class ShipmentItemByShipment {
  /*@ngInject*/
  constructor ($resource, endpoint) {
      this.endpoint = $resource(endpoint + '/shipments/:shipmentId/items', {}, {
        query: { method: 'GET' }
      })
    }
}
