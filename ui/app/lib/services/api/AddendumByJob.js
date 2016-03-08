export default class AddendumByJobService {
  constructor ($resource, endpointUrl) {
    this.endpoint = $resource(endpointUrl + '/jobs/:jobId/addenda', {}, {
      query: { method: 'GET' }
    })
  }
}
