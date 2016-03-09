export default class ZoneByJob {
  /*@ngInject*/
  constructor($resource, endpoint) {
      this.endpoint = $resource(endpoint + '/jobs/:jobId/zones', {}, {
        query: { method: 'GET' }
      })
    }
  }
