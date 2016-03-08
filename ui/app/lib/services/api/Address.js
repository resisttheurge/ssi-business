export default class Address {
  constructor ($resource, endpointUrl) {
    this.endpoint = $resource(endpointUrl + '/addresses/:addressId', {}, {
      create: { method: 'POST' },
      update: { method: 'PATCH' },
      query: { method: 'GET', params:{ addressId: '' } }
    })
  }
}
