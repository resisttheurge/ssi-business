export default class Report {
  /*@ngInject*/
  constructor ($resource, endpoint) {
      this.endpoint = $resource(endpoint + '/reports/:reportTitle', {}, {
        generate: { method: 'POST' }
      })
    }
}
