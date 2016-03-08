export default class Carrier {
  constructor ($resource, endpointUrl) {
    this.endpoint = $resource(endpointUrl + '/carriers/:carrierId', {}, {
      create: { method: 'POST' },
      update: { method: 'PATCH' },
      query: { method: 'GET', params:{ carrierId: '' } }
    })
  }
}
