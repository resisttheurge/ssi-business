import { ApiService } from 'utils'
export default class Zone extends ApiService {
  /*@ngInject*/
  constructor($resource, endpoint, $q, $unpack) {
    super()

    var self = this;

    self.endpoint = $resource(endpoint + '/zones/:zoneId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ zoneId: '' } }
      })

    self.zoneDateToString = zone => {
      const { fieldDate } = zone
      return ({
        ...zone,
        fieldDate: fieldDate ? fieldDate.toISOString().substring(0, 10) : undefined
      })
    }

    self.zoneStringToDate = zone => {
      const { fieldDate } = zone
      return ({
        ...zone,
        fieldDate: fieldDate ? $convertDate.stringToDate(fieldDate) : undefined
      })
    }

    self.update = function (zone) {
        return $q(function (resolve, reject) {
          if (!zone) {
            return reject('cannot update without a parameter')
          } else if (!zone.id) {
            return reject('cannot update object with missing id')
          } else {
            return resolve(self.endpoint.update({ zoneId: zone.id }, zone).$promise.then($unpack))
          }
        })  
      }

    // this.create = zone =>
    //   $q(
    //     (resolve, reject) =>
    //       zone ?
    //         resolve(this.endpoint.create(zone).$promise.then($unpack))
    //       : reject('cannot call create without a parameter')
    //   )

    self.create = function (zone) {
        return $q(function (resolve, reject) {
          if (!zone) {
            return reject('cannot call `Zone.create` without a zone parameter')
          } else {
            return resolve(zone =>
              self.endpoint.create(self.zoneDateToString(zone)).$promise
                .then($unpack)
            )
          }
        })
      }

    self.delete = function (zone) {
        return $q(function (resolve, reject) {
          if (!zone) {
            return reject('cannot call `zone.delete` without a zone parameter')
          } else if (!zone.id) {
            return reject('cannot call `zone.delete` on a zone object missing an `id` value')
          } else {
            return resolve(self.endpoint.delete({ zoneId: zone.id },
              self.zoneDateToString(zone)).$promise.then($unpack))
          }
        })
      }

    //
    // self.update = function (zone) {
    //       return $q(function (resolve, reject) {
    //         if (!zone) {
    //           return reject('cannot call `zone.update` without a zone parameter')
    //         } else if (!zone.id) {
    //           return reject('cannot call `zone.update` on a zone object missing an `id` value')
    //         } else {
    //           return resolve(
    //             self.prepForUpdate(zone)
    //               .then(zone =>
    //                 self.endpoint.update({ zoneId: zone.id }, self.zoneDateToString(zone)).$promise
    //                   .then($unpack)
    //               )
    //           )
    //         }
    //       })
    //     }

    this.delete = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.delete({ zoneId: item.id }, item).$promise.then($unpack))
          : reject('cannot call Zone.delete without a parameter')
      )

  }
}
