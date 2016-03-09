export default class Addendum {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    this.endpoint = $resource(endpoint + '/addenda/:addendumId', {}, {
      create: { method: 'POST' },
      update: { method: 'PATCH' },
      query: { method: 'GET', params:{ addendumId: '' } }
    })
  }
}
