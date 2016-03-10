import { ApiService } from 'utils'
export default class Report extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/reports/:reportTitle', {}, {
        generate: { method: 'POST' }
      })
  }
}
