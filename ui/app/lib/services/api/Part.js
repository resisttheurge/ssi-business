import { ApiService } from 'utils'
export default class Part extends ApiService {
  /*@ngInject*/
  constructor ($q, $unpack, $resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/parts/:partId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ partId: '' } }
      })

    this.list = () =>
      this.endpoint.query().$promise
        .then($unpack)

    this.update = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.update({ partId: item.id }, item).$promise.then($unpack))
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
            resolve(this.endpoint.delete({ partId: item.id }).$promise.then($unpack))
          : reject('cannot call delete without a parameter')
      )
  }
}
