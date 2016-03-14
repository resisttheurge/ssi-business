import { ApiService } from 'utils'
export default class Manufacturer extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/manufacturers/:manufacturerId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ manufacturerId: '' } }
      })
  }
}
