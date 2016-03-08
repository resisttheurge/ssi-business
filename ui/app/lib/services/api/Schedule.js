export default class Schedule {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/schedules/:scheduleId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ scheduleId: '' } }
      })
    }
  }
