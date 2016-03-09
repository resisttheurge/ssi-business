export default class Carrier {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    this.endpoint = $resource(endpoint + '/carriers/:carrierId', {}, {
      create: { method: 'POST' },
      update: { method: 'PATCH' },
      query: { method: 'GET', params:{ carrierId: '' } }
    })
  }
}
