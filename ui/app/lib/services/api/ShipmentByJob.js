export default class ShipmentByJob {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/jobs/:jobId/shipments', {}, {
        query: { method: 'GET' }
      })
    }
  }
