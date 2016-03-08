export default class PartOrder {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/part-orders/:partOrderId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ partOrderId: '' } }
      })
    }
}
