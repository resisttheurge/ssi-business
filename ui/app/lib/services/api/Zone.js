export default class Zone {
  constructor($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/zones/:zoneId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ zoneId: '' } }
      })
    }
  }
