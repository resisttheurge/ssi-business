export default class PartOrderByJob {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/jobs/:jobId/part-orders', {}, {
        query: { method: 'GET' }
      })
    }
}
