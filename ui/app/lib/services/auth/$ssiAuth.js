export default class $ssiAuth {
  constructor($resource, endpointUrl) {
    this.endpoint = $resource(endpointUrl + '/auth', {}, {
      login: { method: 'POST' }
    })
  }
}
