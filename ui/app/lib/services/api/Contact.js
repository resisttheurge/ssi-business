export default class Contact {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    this.endpoint = $resource(endpoint + '/contacts/:contactId', {}, {
      create: { method: 'POST' },
      update: { method: 'PATCH' },
      query: { method: 'GET', params:{ contactId: '' } }
    })
  }
}
