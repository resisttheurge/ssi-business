import { ApiService } from 'utils'
export default class JobAddresses extends ApiService {
  /*@ngInject*/
  constructor ($q, $unpack, $resource, Address, endpoint) {
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

    this.prepForUpdate = (job, jobAddresses) => {
      const { shipping, invoicing } = jobAddresses
      return [shipping, invoicing].filter(x => x !== undefined)
    }

    this.update = (job, jobAddresses) =>
      $q(
        (resolve, reject) =>
          job && job.id && jobAddresses ?
            resolve($q.all(this.prepForUpdate(job, jobAddresses).map(::Address.update)))
          : reject('cannot call `JobAddresses.update` without job or jobAddresses parameters')
      )

    this.prepForCreate = (job, jobAddresses) => {
      const { shipping, invoicing } = jobAddresses
      return $q.all({
        shipping: shipping ? Address.create(shipping) : undefined,
        invoicing: invoicing ? Address.create(invoicing) : undefined
      })
    }

    this.create = (job, jobAddresses) =>
      $q(
        (resolve, reject) =>
          job && job.id && jobAddresses ?
            resolve(
              this.prepForCreate(job, jobAddresses)
                .then(jobAddresses => this.endpoint.create({ jobId: job.id }, jobAddresses))
            )
          : reject('cannot call `JobAddresses.create` without job or jobAddresses parameters')
      )

  }
}
