import { ApiService } from 'utils'
export default class Zone extends ApiService {
  /*@ngInject*/
  constructor($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/zones/:zoneId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ zoneId: '' } }
      })
  }
}
