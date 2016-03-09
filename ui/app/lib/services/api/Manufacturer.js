export default class Manufacturer {
  /*@ngInject*/
  constructor ($resource, endpoint) {
      this.endpoint = $resource(endpoint + '/manufacturers/:manufacturerId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ manufacturerId: '' } }
      })
    }
}
