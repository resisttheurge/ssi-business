export default class Addendum {
  constructor ($resource, endpointUrl) {
    this.endpoint = $resource(endpointUrl + '/addenda/:addendumId', {}, {
      create: { method: 'POST' },
      update: { method: 'PATCH' },
      query: { method: 'GET', params:{ addendumId: '' } }
    })
  }
}
