export default class Report {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/reports/:reportTitle', {}, {
        generate: { method: 'POST' }
      })
    }
}
