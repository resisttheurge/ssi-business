export default class Address {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    this.endpoint = $resource(endpoint + '/addresses/:addressId', {}, {
      create: { method: 'POST' },
      update: { method: 'PATCH' },
      query: { method: 'GET', params:{ addressId: '' } }
    })
  }
}
