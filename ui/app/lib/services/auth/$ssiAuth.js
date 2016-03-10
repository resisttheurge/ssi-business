import { AbstractService } from 'utils'

export default class $ssiAuth extends AbstractService {
  /*@ngInject*/
  constructor($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/auth', {}, {
      login: { method: 'POST' }
    })
  }
}
