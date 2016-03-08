export default class Shipment {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/shipments/:shipmentId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shipmentId: '' } }
      })
    }
}
