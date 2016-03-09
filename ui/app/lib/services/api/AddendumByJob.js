export default class AddendumByJobService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    this.endpoint = $resource(endpoint + '/jobs/:jobId/addenda', {}, {
      query: { method: 'GET' }
    })
  }
}
