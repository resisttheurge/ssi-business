export default class ShipmentItemByShipment {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/shipments/:shipmentId/items', {}, {
        query: { method: 'GET' }
      })
    }
}
