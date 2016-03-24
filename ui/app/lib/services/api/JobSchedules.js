import { ApiService } from 'utils'
export default class JobSchedules extends ApiService {
  /*@ngInject*/
  constructor ($q, $resource, $unpack, $convertDate, endpoint) {
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

    this.jobSchedulesStringToDate = jobSchedules => do {
      const { engineering, mechanical, electrical, shipping, installation } = jobSchedules;
      ({
        engineering: engineering ? this.scheduleStringToDate(engineering) : undefined,
        mechanical: mechanical ? this.scheduleStringToDate(mechanical) : undefined,
        electrical: electrical ? this.scheduleStringToDate(electrical) : undefined,
        shipping: shipping ? this.scheduleStringToDate(shipping) : undefined,
        installation: installation ? this.scheduleStringToDate(installation) : undefined
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
  }
}
