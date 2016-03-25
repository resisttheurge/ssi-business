import { ApiService } from 'utils'
export default class Address extends ApiService {
  /*@ngInject*/
  constructor ($q, $unpack, $resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/addresses/:addressId', {}, {
      create: { method: 'POST' },
      update: { method: 'PATCH' },
      query: { method: 'GET', params:{ addressId: '' } }
    })

    this.create = item =>
      $q(
        (resolve, reject) =>
          item ?
            resolve(
              this.endpoint.create({
                ...item,
                lines: item.lines ? item.lines.map(l => l.value) : undefined
              }).$promise
                .then($unpack)
            )
          : reject('cannot call Address.create without a parameter')
      )

    this.update = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(
              this.endpoint.update({ addressId: item.id }, {
                ...item,
                lines: item.lines ? item.lines.map(l => l.value) : undefined
              }).$promise
                .then($unpack))
          : reject('cannot call Address.update without a parameter')
      )
  }
}
