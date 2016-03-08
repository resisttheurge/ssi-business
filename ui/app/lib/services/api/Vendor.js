export default class Vendor {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/vendors/:vendorId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ vendorId: '' } }
      })
    }
}
