export default class ZoneByJob {
  constructor($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/jobs/:jobId/zones', {}, {
        query: { method: 'GET' }
      })
    }
  }
