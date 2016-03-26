import { ApiService } from 'utils'
export default class Drawing extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint, $q, $unpack, Contact, Address) {
    super()

    this.endpoint = $resource(endpoint + '/drawings/:drawingId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ drawingId: '' } }
      });

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

    this.drawingPadLines = drawing => {
      const { info } = drawing
      const { address } = info ? info : {}
      return {
        ...drawing,
        info: {
          ...info,
          address: address ? this.padLines(address) : undefined
        }
      }
    }

    this.drawingStringToDate = drawing => {
      const { info } = drawing
      const { revisionDate, startDate, shopDate, fieldDate, requestDate } = info ? info : {}
      return {
        ...drawing,
        info: {
          ...info,
          revisionDate: revisionDate ? $convertDate.stringToDate(revisionDate) : undefined,
          startDate: startDate ? $convertDate.stringToDate(startDate) : undefined,
          shopDate: shopDate ? $convertDate.stringToDate(shopDate) : undefined,
          fieldDate: fieldDate ? $convertDate.stringToDate(fieldDate) : undefined,
          requestDate: requestDate ? $convertDate.stringToDate(requestDate) : undefined
        }
      }
    }

    this.drawingDateToString = drawing => {
      const { info } = drawing
      const { revisionDate, startDate, shopDate, fieldDate, requestDate } = info ? info : {}
      return {
        ...drawing,
        info: {
          ...info,
          revisionDate: revisionDate ? revisionDate.toISOString().substring(0, 10) : undefined,
          startDate: startDate ? startDate.toISOString().substring(0, 10) : undefined,
          shopDate: shopDate ? shopDate.toISOString().substring(0, 10) : undefined,
          fieldDate: fieldDate ? fieldDate.toISOString().substring(0, 10) : undefined,
          requestDate: requestDate ? requestDate.toISOString().substring(0, 10) : undefined
        }
      }
    }

    this.list = () =>
      this.endpoint.query().$promise
        .then($unpack)

    this.get = id =>
      this.endpoint.get({ drawingId: id }).$promise
        .then($unpack)
        .then(::this.drawingStringToDate)
        .then(::this.drawingPadLines)

    this.prepForUpdate = drawing => {
      const { info } = drawing
      const { contact, address } = info
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
        ...drawing,
        info:
          info ?
            { ...info, ...partialInfo }
          : undefined
      })).then(::this.drawingDateToString)
    }

    this.update = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(
              this.prepForUpdate(item)
                .then(item =>
                  this.endpoint.update({ drawingId: item.id }, item).$promise
                    .then($unpack)
                )
            )
          : reject('cannot call Drawing.update without a parameter')
      )

    this.prepForCreate = drawing => {
      const { info } = drawing
      const { contact, address } = info
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
        ...drawing,
        info:
          info ?
            { ...info, ...partialInfo }
          : undefined
      })).then(::this.drawingDateToString)
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
          : reject('cannot call Drawing.create without a parameter')
      )

    this.delete = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.delete({ drawingId: item.id }, item).$promise.then($unpack))
          : reject('cannot call Drawing.delete without a parameter')
      )

  }
}
