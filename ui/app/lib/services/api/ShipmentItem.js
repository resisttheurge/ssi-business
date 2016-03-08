export default class ShipmentItem {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/shipment-items/:shipmentItemId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shipmentItemId: '' } }
      })
    }
  }
