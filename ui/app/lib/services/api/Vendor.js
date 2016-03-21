import { ApiService } from 'utils'
export default class Vendor extends ApiService {
  /*@ngInject*/
  constructor ($q, $unpack, $resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/vendors/:vendorId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ vendorId: '' } }
      })

    this.update = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.update({ vendorId: item.id }, item).$promise.then($unpack))
          : reject('cannot call create without a parameter')
      )

    this.create = item =>
      $q(
        (resolve, reject) =>
          item ?
            resolve(this.endpoint.create(item).$promise.then($unpack))
          : reject('cannot call create without a parameter')
      )

    this.delete = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.delete({ vendorId: item.id }).$promise.then($unpack))
          : reject('cannot call delete without a parameter')
      )
  }
}
