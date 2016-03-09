export default class ShipmentByJob {
  /*@ngInject*/
  constructor ($resource, endpoint) {
      this.endpoint = $resource(endpoint + '/jobs/:jobId/shipments', {}, {
        query: { method: 'GET' }
      })
    }
  }
