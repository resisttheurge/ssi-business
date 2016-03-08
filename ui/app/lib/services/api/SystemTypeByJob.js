export default class SystemTypeByJob {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/jobs/:jobId/system-types', {}, {
        add: { method: 'POST' },
        remove: { method: 'DELETE' },
        query: { method: 'GET' }
      })
    }
}
