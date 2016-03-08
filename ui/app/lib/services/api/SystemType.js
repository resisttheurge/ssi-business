export default class SystemType {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/system-types/:systemTypeId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ systemTypeId: '' } }
      })
    }
}
