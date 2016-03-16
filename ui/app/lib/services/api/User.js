import { ApiService } from 'utils'
export default class User extends ApiService {
  /*@ngInject*/
  constructor ($q, $unpack, $resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/users/:userId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ userId: '' } }
      })

    this.update = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.update({ userId: item.id }, item).$promise.then($unpack))
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
