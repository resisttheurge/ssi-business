export default class Shipment {
  /*@ngInject*/
  constructor ($resource, endpoint) {
      this.endpoint = $resource(endpoint + '/shipments/:shipmentId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shipmentId: '' } }
      })
    }
}
