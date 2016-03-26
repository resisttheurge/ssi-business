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

    this.padLines = address =>
      !address ?
        {
          lines: [{ id: 0, value: '' }],
          city: '',
          stateOrProvince: '',
          postalCode: '',
          country: ''
        }
      : {
          ...address,
          lines: address.lines ?
            address.lines.map((line, index) => ({ id: index, value: line }))
          : [{ id: 0, value: '' }]
        }

    this.shipmentPadLines = shipment => {
      const { address } = shipment
      return {
        ...shipment,
        address: address ? this.padLines(address) : undefined
      }
    }

    this.shipmentStringToDate = shipment => {
      const { shipDate } = shipment
      return {
        ...shipment,
        shipDate: shipDate ? $convertDate.stringToDate(shipDate) : undefined
      }
    }

    this.shipmentDateToString = shipment => {
      const { shipDate } = shipment
      return {
        ...shipment,
        shipDate: shipDate ? shipDate.toISOString().substring(0, 10) : undefined
      }
    }

    this.list = () =>
      this.endpoint.query().$promise
        .then($unpack)

    this.get = id =>
      this.endpoint.get({ shipmentId: id }).$promise
        .then($unpack)
        .then(::this.shipmentStringToDate)
        .then(::this.shipmentPadLines)

    this.prepForUpdate = shipment => {
      const { contact, address } = shipment
      return $q.all({
        contact:
          contact ?
            contact.id ?
              Contact.update(contact).then(({ before, after }) => after)
            : Contact.create(contact)
          : undefined,
        address:
          address ?
            address.id ?
              Address.update(address).then(({ before, after }) => after)
            : Address.create(address)
          : undefined
      }).then(partialInfo => ({
        ...shipment,
        ...partialInfo
      })).then(::this.shipmentDateToString)
    }

    this.update = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(
              this.prepForUpdate(item)
                .then(item =>
                  this.endpoint.update({ shipmentId: item.id }, item).$promise
                    .then($unpack)
                )
            )
          : reject('cannot call Shipment.update without a parameter')
      )

    this.prepForCreate = shipment => {
      const { contact, address } = shipment
      return $q.all({
        contact:
          contact ?
            Contact.create(contact)
          : undefined,
        address:
          address ?
            Address.create(address)
          : undefined
      }).then(partialInfo => ({
        ...shipment,
        ...partialInfo
      })).then(::this.shipmentDateToString)
    }

    this.create = item =>
      $q(
        (resolve, reject) =>
          item ?
            resolve(
              this.prepForCreate(item)
                .then(item =>
                  this.endpoint.create(item).$promise
                    .then($unpack)
                )
            )
          : reject('cannot call Shipment.create without a parameter')
      )

    this.delete = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.delete({ shipmentId: item.id }, item).$promise.then($unpack))
          : reject('cannot call Shipment.delete without a parameter')
      )
  }
}
