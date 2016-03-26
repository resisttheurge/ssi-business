import { ApiService } from 'utils'
export default class Carrier extends ApiService {
  /*@ngInject*/
  constructor ($resource, $q, $unpack, endpoint) {
    super()

    var self = this;

    self.endpoint = $resource(endpoint + '/carriers/:carrierId', {}, {
      create: { method: 'POST' },
      update: { method: 'PATCH' },
      query: { method: 'GET', params:{ carrierId: '' } }
    })

    this.list = () =>
      this.endpoint.query().$promise
        .then($unpack)

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
            resolve(this.endpoint.delete({ carrierId: item.id }).$promise.then($unpack))
          : reject('cannot call delete without a parameter')
      )

    self.update = function (item) {
        return $q(function (resolve, reject) {
          if (!item) {
            return reject('cannot call update without a parameter')
          } else {
            return resolve(self.endpoint.update({ carrierId: item.id }, item)
            .$promise.then($unpack))
          }
        })
      }

  }
}
