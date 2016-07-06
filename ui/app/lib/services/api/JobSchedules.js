import { ApiService } from 'utils'
export default class JobSchedules extends ApiService {
  /*@ngInject*/
  constructor ($q, $resource, $unpack, $convertDate, Schedule, endpoint) {
    super()
    this.endpoint = $resource(endpoint + '/jobs/:jobId/schedules', {}, {
        query: { method: 'GET' }
      })

    this.scheduleStringToDate = schedule => do {
      const { startDate, completeDate } = schedule;
      ({
        ...schedule,
        startDate: startDate ? $convertDate.stringToDate(startDate) : undefined,
        completeDate: completeDate ? $convertDate.stringToDate(completeDate) : undefined
      })
    }

    this.jobSchedulesStringToDate = jobSchedules => {
      const { engineering, mechanical, electrical, shipping, installation } = jobSchedules
      return ({
        engineering: engineering ? this.scheduleStringToDate(engineering) : undefined,
        mechanical: mechanical ? this.scheduleStringToDate(mechanical) : undefined,
        electrical: electrical ? this.scheduleStringToDate(electrical) : undefined,
        shipping: shipping ? this.scheduleStringToDate(shipping) : undefined,
        installation: installation ? this.scheduleStringToDate(installation) : undefined
      })
    }

    this.scheduleDateToString = schedule => {
      const { startDate, completeDate } = schedule;
      return {
        ...schedule,
        startDate: startDate ? startDate.toISOString().substring(0, 10) : undefined,
        completeDate: completeDate ? completeDate.toISOString().substring(0, 10) : undefined
      }
    }

    this.jobSchedulesDateToString = jobSchedules => {
      const { engineering, mechanical, electrical, shipping, installation } = jobSchedules
      return ({
        engineering: engineering ? this.scheduleDateToString(engineering) : undefined,
        mechanical: mechanical ? this.scheduleDateToString(mechanical) : undefined,
        electrical: electrical ? this.scheduleDateToString(electrical) : undefined,
        shipping: shipping ? this.scheduleDateToString(shipping) : undefined,
        installation: installation ? this.scheduleDateToString(installation) : undefined
      })
    }

    this.get = ({ jobId }) =>
        $q(
          (resolve, reject) =>
            jobId ?
              resolve(
                this.endpoint.get({ jobId }).$promise
                  .then($unpack)
                  .then(::this.jobSchedulesStringToDate)
              )
            : reject('cannot call `JobSchedules.get` without a jobId parameter')
        )

    this.prepForUpdate = (job, jobSchedules) => {
      const { engineering, mechanical, electrical, shipping, installation } = jobSchedules
      return $q.all([
        engineering ?
          engineering.id ?
            engineering
          : this.create(job, { engineering }).then(() => {})
        : undefined,
        mechanical ?
          mechanical.id ?
            mechanical
          : this.create(job, { mechanical }).then(() => {})
        : undefined,
        electrical ?
          electrical.id ?
            electrical
          : this.create(job, { electrical }).then(() => {})
        : undefined,
        shipping ?
          shipping.id ?
            shipping
          : this.create(job, { shipping }).then(() => {})
        : undefined,
        installation ?
          installation.id ?
            installation
          : this.create(job, { installation }).then(() => {})
        : undefined
      ].filter(x => x !== undefined))
    }

    this.update = (job, jobSchedules) =>
      $q(
        (resolve, reject) =>
          job && job.id && jobSchedules ?
            resolve(
              this.prepForUpdate(job, jobSchedules)
                .then(all => $q.all(
                  all
                    .filter(x => x !== undefined)
                    .map(::this.scheduleDateToString)
                    .map(::Schedule.update)
                ))
            )
          : reject('cannot call `JobSchedules.update` without job or jobSchedules parameters')
      )

    this.prepForCreate = (job, jobSchedules) => {
      const { engineering, mechanical, electrical, shipping, installation } = jobSchedules
      return [
        engineering ?
          { ...engineering, scheduleType: 'ENGINEERING', jobId: job.id }
        : undefined,
        mechanical ?
          { ...mechanical, scheduleType: 'MECHANICAL', jobId: job.id }
        : undefined,
        electrical ?
          { ...electrical, scheduleType: 'ELECTRICAL', jobId: job.id }
        : undefined,
        shipping ?
          { ...shipping, scheduleType: 'SHIPPING', jobId: job.id }
        : undefined,
        installation ?
          { ...installation, scheduleType: 'INSTALLATION', jobId: job.id }
        : undefined,
      ].filter(x => x !== undefined)
    }

    this.create = (job, jobSchedules) =>
      $q(
        (resolve, reject) =>
          job && job.id && jobSchedules ?
            resolve($q.all(this.prepForCreate(job, jobSchedules).map(::this.scheduleDateToString).map(::Schedule.create)))
          : reject('cannot call `JobSchedules.create` without job or jobSchedules parameters')
      )
  }
}
