export default class SystemTypeByJob {
  /*@ngInject*/
  constructor ($resource, endpoint) {
      this.endpoint = $resource(endpoint + '/jobs/:jobId/system-types', {}, {
        add: { method: 'POST' },
        remove: { method: 'DELETE' },
        query: { method: 'GET' }
      })
    }
}
