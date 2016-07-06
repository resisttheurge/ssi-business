import { ApiService } from 'utils'
export default class Zone extends ApiService {
  /*@ngInject*/
  constructor($resource, endpoint, $q, $unpack, $convertDate) {
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

    this.get = zoneId =>
      this.endpoint.get({ zoneId }).$promise
        .then($unpack)
        .then(::this.zoneStringToDate)

    this.update = zone =>
      $q(
        (resolve, reject) =>
          zone && zone.id ?
            resolve(this.endpoint.update({ zoneId: zone.id }, self.zoneDateToString(zone)).$promise.then($unpack))
          : reject('cannot call Zone.update without a parameter')
      )

    this.create = zone =>
      $q(
        (resolve, reject) =>
          zone ?
            resolve(this.endpoint.create(self.zoneDateToString(zone)).$promise.then($unpack))
          : reject('cannot call Zone.create without a parameter')
      )

    this.delete = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.delete({ zoneId: item.id }).$promise.then($unpack))
          : reject('cannot call Zone.delete without a parameter')
      )

  }
}
