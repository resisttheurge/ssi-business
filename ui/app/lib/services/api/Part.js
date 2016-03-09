export default class Part {
  /*@ngInject*/
  constructor ($resource, endpoint) {
      this.endpoint = $resource(endpoint + '/parts/:partId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ partId: '' } }
      })
    }
}
