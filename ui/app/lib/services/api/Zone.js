export default class Zone {
  /*@ngInject*/
  constructor($resource, endpoint) {
      this.endpoint = $resource(endpoint + '/zones/:zoneId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ zoneId: '' } }
      })
    }
  }
