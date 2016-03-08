export default class User {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/users/:userId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ userId: '' } }
      })
    }
  }
