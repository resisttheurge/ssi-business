export default class PartOrderByJob {
  /*@ngInject*/
  constructor ($resource, endpoint) {
      this.endpoint = $resource(endpoint + '/jobs/:jobId/part-orders', {}, {
        query: { method: 'GET' }
      })
    }
}
