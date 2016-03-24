import { ApiService } from 'utils'
export default class JobAddresses extends ApiService {
  /*@ngInject*/
  constructor ($q, $unpack, $resource, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/jobs/:jobId/addresses', {}, {
        create: { method: 'POST' },
        query: { method: 'GET' }
      })

    this.padLines = address =>
      !address ?
        { lines: [''], city: '', stateOrProvince: '', postalCode: '', country: '' }
      : !address.lines || address.lines.length < 1 ?
        { ...address, lines: [''] }
      : address

    this.padAllLines = ({ shipping, invoicing }) =>
      ({ shipping: this.padLines(shipping), invoicing: this.padLines(invoicing) })

    this.get = ({ jobId }) =>
        $q(
          (resolve, reject) =>
            jobId ?
              resolve(this.endpoint.get({ jobId }).$promise.then($unpack).then(::this.padAllLines))
            : reject('cannot call `JobAddresses.get` without a jobId parameter')
        )

    this.create = ({ jobId }, { jobAddresses }) =>
      $q(
        (resolve, reject) =>
          jobId && jobAddresses ?
            resolve(this.endpoint.create({ jobId }, jobAddresses).$promise.then($unpack))
          : reject('cannot call `JobAddresses.create` without jobId or jobAddresses parameters')
      )

  }
}
