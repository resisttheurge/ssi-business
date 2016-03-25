import { ApiService } from 'utils'
export default class Contact extends ApiService {
  /*@ngInject*/
  constructor ($q, $unpack, $resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/contacts/:contactId', {}, {
      create: { method: 'POST' },
      update: { method: 'PATCH' },
      query: { method: 'GET', params:{ contactId: '' } }
    })

    this.create = item =>
      $q(
        (resolve, reject) =>
          item ?
            resolve(this.endpoint.create(item).$promise.then($unpack))
          : reject('cannot call Contact.create without a parameter')
      )

    this.update = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.update({ contactId: item.id }, item).$promise.then($unpack))
          : reject('cannot call Contact.update without a parameter')
      )
  }
}
