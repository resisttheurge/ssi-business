import { ApiService } from 'utils'
export default class Schedule extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/schedules/:scheduleId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ scheduleId: '' } }
      })
  }
}
