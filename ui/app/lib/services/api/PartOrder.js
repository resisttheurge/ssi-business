import { ApiService } from 'utils'
export default class PartOrder extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint, $q, $unpack) {
    super()

    var self = this;

    this.endpoint = $resource(endpoint + '/part-orders/:partOrderId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ partOrderId: '' } }
      })

    self.update = function (item) {
        return $q(function (resolve, reject) {
          if (!item) {
            return reject('cannot update without a parameter')
          } else if (!item.id) {
            return reject('cannot update object with missing id')
          } else {
            return resolve(self.endpoint.update({ partOrderId: item.id }, item).$promise.then($unpack))
          }
        })
      }

  }
}
