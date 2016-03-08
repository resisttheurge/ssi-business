export default class Part {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/parts/:partId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ partId: '' } }
      })
    }
}
