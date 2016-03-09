export default class $ssiAuth {
  /*@ngInject*/
  constructor($resource, endpoint) {
    this.endpoint = $resource(endpoint + '/auth', {}, {
      login: { method: 'POST' }
    })
  }
}
