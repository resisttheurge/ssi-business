import { ApiService } from 'utils'
export default class ShippingGroup extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint, $q, $unpack, $convertDate, Address, Contact) {
    super()

    this.endpoint = $resource(endpoint + '/shipping-groups/:shippingGroupId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ shippingGroupId: '' } }
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

    this.sgPadLines = sg => {
      const { info } = sg
      const { address } = info ? info : {}
      return {
        ...sg,
        info: {
          ...info,
          address: this.padLines(address)
        }
      }
    }

    this.sgStringToDate = sg => {
      const { info } = sg
      const { revisionDate, startDate, shopDate, fieldDate, requestDate } = info ? info : {}
      return {
        ...sg,
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

    this.sgDateToString = sg => {
      const { info } = sg
      const { revisionDate, startDate, shopDate, fieldDate, requestDate } = info ? info : {}
      return {
        ...sg,
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
        .then(groups => groups.map(::this.sgStringToDate))
        .then(groups => groups.map(::this.sgPadLines))

    this.get = id =>
      this.endpoint.get({ shippingGroupId: id }).$promise
        .then($unpack)
        .then(::this.sgStringToDate)
        .then(::this.sgPadLines)

    this.prepForUpdate = sg => {
      const { info } = sg
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
        ...sg,
        info:
          info ?
            { ...info, ...partialInfo }
          : undefined
      })).then(::this.sgDateToString)
    }

    this.update = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(
              this.prepForUpdate(item)
                .then(item =>
                  this.endpoint.update({ shippingGroupId: item.id }, item).$promise
                    .then($unpack)
                )
            )
          : reject('cannot call ShippingGroup.update without a parameter')
      )

    this.prepForCreate = sg => {
      const { info } = sg
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
        ...sg,
        info:
          info ?
            { ...info, ...partialInfo }
          : undefined
      })).then(::this.sgDateToString)
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
          : reject('cannot call ShippingGroup.create without a parameter')
      )

    this.delete = item =>
      $q(
        (resolve, reject) =>
          item && item.id ?
            resolve(this.endpoint.delete({ shippingGroupId: item.id }, item).$promise.then($unpack))
          : reject('cannot call ShippingGroup.delete without a parameter')
      )

  }
}
