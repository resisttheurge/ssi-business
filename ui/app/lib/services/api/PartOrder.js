import { ApiService } from 'utils'
export default class partOrder extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint, $q, $unpack) {
    super()

    var self = this;

    this.endpoint = $resource(endpoint + '/part-orders/:partOrderId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ partOrderId: '' } }
      })

    // self.update = function (partOrder) {
    //     return $q(function (resolve, reject) {
    //       if (!partOrder) {
    //         return reject('cannot update without a parameter')
    //       } else if (!partOrder.id) {
    //         return reject('cannot update object with missing id')
    //       } else {
    //         return resolve(self.endpoint.update({ partOrderId: partOrder.id }, partOrder).
    //         $promise.then($unpack))
    //       }
    //     })
    //   }
    self.partOrderStringToDate = partOrder => {
      const { requestDate, purchaseDate, releaseDate } = partOrder
      return ({
        ...partOrder,
        requestDate: requestDate ? $requestDate.stringToDate(requestDate) : undefined,
        purchaseDate: purchaseDate ? $purchaseDate.stringToDate(purchaseDate) : undefined,
        releaseDate: releaseDate ? $releaseDate.stringToDate(releaseDate) : undefined
      })
    }

    self.partOrderDateToString = partOrder => {
      const { requestDate, purchaseDate, releaseDate } = partOrder
      return ({
        ...partOrder,
        requestDate: requestDate ? requestDate.toISOString().substring(0, 10) : undefined,
        purchaseDate: purchaseDate ? purchaseDate.toISOString().substring(0, 10) : undefined,
        releaseDate: releaseDate ? releaseDate.toISOString().substring(0, 10) : undefined
      })
    }

    self.get = function (params) {
        return $q(function (resolve, reject) {
          return resolve(
            self.endpoint.get(params).$promise
              .then($unpack)
              .then(::self.partOrderStringToDate)
            )
        })
      }

    // this.create = partOrder =>
    //   $q(
    //     (resolve, reject) =>
    //       partOrder ?
    //         resolve(this.endpoint.create(partOrder).$promise.then($unpack))
    //       : reject('cannot call create without a parameter')
    //   )

    self.create = function (partOrder) {
        return $q(function (resolve, reject) {
          if (!partOrder) {
            return reject('cannot call `partOrder.create` without a partOrder parameter')
          } else {
            return resolve(partOrder =>
              self.endpoint.create(self.partOrderDateToString(partOrder)).$promise
                .then($unpack)
            )
          }
        })
      }

    self.update = function (partOrder) {
          return $q(function (resolve, reject) {
            if (!partOrder) {
              return reject('cannot update without a parameter')
            } else if (!partOrder.id) {
              return reject('cannot update object with missing id')
            } else {
              return resolve(
                self.endpoint.update({ partOrderId: partOrder.id },
                   partOrder).$promise.then($unpack))
            }
          })
        }

    // self.update = function (partOrder) {
    //     return $q(function (resolve, reject) {
    //       if (!partOrder) {
    //         return reject('cannot call `partOrder.update` without a partOrder parameter')
    //       } else if (!partOrder.id) {
    //         return reject(
    //           'cannot call `partOrder.update` on a partOrder object missing an `id` value')
    //       } else {
    //         return resolve(
    //           self.prepForUpdate(partOrder)
    //             .then(partOrder =>
    //               self.endpoint.update({ partOrderId: partOrder.id },
    //                 self.partOrderDateToString(partOrder)).$promise
    //                 .then($unpack)
    //             )
    //         )
    //       }
    //     })
    //   }

    self.delete = function (partOrder) {
        return $q(function (resolve, reject) {
          if (!partOrder) {
            return reject(
              'cannot call `partOrder.delete` without a partOrder parameter')
          } else if (!partOrder.id) {
            return reject(
              'cannot call `partOrder.delete` on a partOrder object missing an `id` value')
          } else {
            return resolve(
              self.endpoint.delete({ partOrderId: partOrder.id },
                 self.partOrderDateToString(partOrder)).$promise.then($unpack))
          }
        })
      }
  }

// }
}
