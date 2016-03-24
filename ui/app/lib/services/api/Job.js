import { ApiService } from 'utils'
export default class Job extends ApiService {
  /*@ngInject*/
  constructor ($q, $resource, $unpack, $convertDate, endpoint, JobAddresses, JobSchedules) {
    super()

    var self = this

    self.addresses = JobAddresses
    self.schedules = JobSchedules

    self.endpoint = $resource(endpoint + '/jobs/:jobId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ jobId: '' } }
      })

    self.list = function (params) {
        return $q(function (resolve, reject) {
          return resolve(self.endpoint.query(params).$promise.then($unpack))
        })
      }

    self.jobStringToDate = job => {
      const { startDate, dueDate, completeDate } = job
      return ({
        ...job,
        startDate: startDate ? $convertDate.stringToDate(startDate) : undefined,
        dueDate: dueDate ? $convertDate.stringToDate(dueDate) : undefined,
        completeDate: completeDate ? $convertDate.stringToDate(completeDate) : undefined
      })
    }

    self.jobDateToString = job => {
      const { startDate, dueDate, completeDate } = job
      return ({
        ...job,
        startDate: startDate ? startDate.toISOString().substring(0, 10) : undefined,
        dueDate: dueDate ? dueDate.toISOString().substring(0, 10) : undefined,
        completeDate: completeDate ? completeDate.toISOString().substring(0, 10) : undefined
      })
    }

    self.get = function (params) {
        return $q(function (resolve, reject) {
          return resolve(
            self.endpoint.get(params).$promise
              .then($unpack)
              .then(::self.jobStringToDate)
            )
        })
      }

    self.create = function (job) {
        return $q(function (resolve, reject) {
          if (!job) {
            return reject('cannot call `Job.create` without a job parameter')
          } else if (job.id) {
            return reject('cannot call `Job.create` on a job object that has an existing `id` value')
          } else {
            return resolve(self.endpoint.create(self.jobDateToString(job)).$promise.then($unpack))
          }
        })
      }

    self.update = function (job) {
        return $q(function (resolve, reject) {
          if (!job) {
            return reject('cannot call `Job.update` without a job parameter')
          } else if (!job.id) {
            return reject('cannot call `Job.update` on a job object missing an `id` value')
          } else {
            return resolve(self.endpoint.update({ jobId: job.id }, self.jobDateToString(job)).$promise.then($unpack))
          }
        })
      }

    self.delete = function (job) {
        return $q(function (resolve, reject) {
          if (!job) {
            return reject('cannot call `Job.delete` without a job parameter')
          } else if (!job.id) {
            return reject('cannot call `Job.delete` on a job object missing an `id` value')
          } else {
            return resolve(self.endpoint.delete({ jobId: job.id }, self.jobDateToString(job)).$promise.then($unpack))
          }
        })
      }

    self.updateFull = (job, jobAddresses, jobSchedules) =>
      $q.all([
        self.update(job),
        self.addresses.update(job, jobAddresses),
        self.schedules.update(job, jobSchedules)
      ])

    self.createFull = (job, jobAddresses, jobSchedules) =>
      $q.all([
        self.create(job),
        self.addresses.create(job, jobAddresses),
        self.schedules.create(job, jobSchedules)
      ])
  }
}
