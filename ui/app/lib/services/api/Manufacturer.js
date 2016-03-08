export default class Manufacturer {
  constructor ($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/manufacturers/:manufacturerId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ manufacturerId: '' } }
      })
    }
}
