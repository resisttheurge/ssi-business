import { ApiService } from 'utils'
export default class Shipment extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint, $q, $unpack) {
    super()

    var self = this;

    this.endpoint = $resource(endpoint + '/shipments/:shipmentId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shipmentId: '' } }
      })

    //  //
    // self.update = function (item) {
    //     return $q(function (resolve, reject) {
    //       if (!item) {
    //         return reject('cannot update without a parameter')
    //       } else if (!item.id) {
    //         return reject('cannot update object with missing id')
    //       } else {
    //         return resolve(self.endpoint.update({ shipmentId: item.id }, item).$promise.then($unpack))
    //       }
    //     })
    //   }

    self.update = function (shipment) {
        return $q(function (resolve, reject) {
          if (!shipment) {
            return reject('cannot update without a parameter')
          } else if (!shipment.id) {
            return reject('cannot update object with missing id')
          } else {
            return resolve(
              self.endpoint.update({ shipmentId: shipment.id }, shipment).$promise.then($unpack))
          }
        })
      }

    // //old method
    // this.create = item =>
    //   $q(
    //     (resolve, reject) =>
    //       item ?
    //         resolve(this.endpoint.create(item).$promise.then($unpack))
    //       : reject('cannot call create without a parameter')
    //   )

    self.create = function (shipment) {
        return $q(function (resolve, reject) {
          if (!shipment) {
            return reject('cannot call `shipment.create` without a shipment parameter')
          } else {
            return resolve(shipment =>
              self.endpoint.create(self.shipmentDateToString(shipment)).$promise
                .then($unpack)
            )
          }
        })
      }

    self.delete = function (shipment) {
        return $q(function (resolve, reject) {
          if (!shipment) {
            return reject(
              'cannot call `shipment.delete` without a shipment parameter')
          } else if (!shipment.id) {
            return reject(
              'cannot call `shipment.delete` on a shipment object missing an `id` value')
          } else {
            return resolve(self.endpoint.delete({ shipmentId: shipment.id },
              self.shipmentDateToString(shipment)).$promise.then($unpack))
          }
        })
      }
  }
}
