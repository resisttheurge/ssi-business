export default class Contact {
  constructor ($resource, endpointUrl) {
    this.endpoint = $resource(endpointUrl + '/contacts/:contactId', {}, {
      create: { method: 'POST' },
      update: { method: 'PATCH' },
      query: { method: 'GET', params:{ contactId: '' } }
    })
  }
}
