import { ApiService } from 'utils'
export default class SystemType extends ApiService {
  /*@ngInject*/
  constructor ($q, $unpack, $resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/system-types/:systemTypeId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ systemTypeId: '' } }
      })

    this.update = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.update({ systemtTypeId: item.id }, item).$promise.then($unpack))
          : reject('cannot call create without a parameter')
      )

    this.create = item =>
      $q(
        (resolve, reject) =>
          item ?
            resolve(this.endpoint.create(item).$promise.then($unpack))
          : reject('cannot call create without a parameter')
      )
  }
}
