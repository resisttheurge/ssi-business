import { ApiService } from 'utils'
export default class Job extends ApiService {
  /*@ngInject*/
  constructor ($q, $resource, $unpack, $convertDate, endpoint, Contact, JobAddresses, JobSchedules, SystemTypeByJob) {
    super()

    var self = this

    this.contact = Contact
    this.addresses = JobAddresses
    this.schedules = JobSchedules

    this.showInactive = false;
    this.cache = [];
    this.cacheInvalid = true;
    this.attachAddressess = false;

    self.endpoint = $resource(endpoint + '/jobs/:jobId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ jobId: '' } }
      })

    self.list = (params) => {
      if (self.cacheInvalid === true) {
        return $q((resolve, reject) => {
          return resolve(self.endpoint.query(params).$promise.then($unpack).then(results => {
            self.cache = results;
            self.cacheInvalid = false;
            self.attachAddressess = true;
            return results;
          }))
        })
      } else {
        return $q.resolve(self.cache);
      }
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

    self.prepForCreate = job =>
      $q(
        (resolve, reject) =>
          job.contact ?
            resolve(
              this.contact.create(job.contact)
                .then(contact => {
                  job.contact = contact
                  return job
                })
            )
          : resolve(job)
      )

    self.create = function (job) {
        return $q(function (resolve, reject) {
          if (!job) {
            return reject('cannot call `Job.create` without a job parameter')
          } else if (job.id) {
            return reject('cannot call `Job.create` on a job object that has an existing `id` value')
          } else {
            return resolve(
              self.prepForCreate(job)
                .then(job =>
                  self.endpoint.create(self.jobDateToString(job)).$promise
                    .then($unpack)
                )
            )
          }
        })
      }

    self.prepForUpdate = job =>
      $q(
        (resolve, reject) =>
          job.contact ?
            job.contact.id ?
              resolve(
                this.contact.update(job.contact)
                  .then(() => job)
              )
            : resolve(
                this.contact.create(job.contact)
                  .then(contact => {
                    job.contact = contact
                    return job
                  })
              )
          : resolve(job)
      )

    self.update = function (job) {
        return $q(function (resolve, reject) {
          if (!job) {
            return reject('cannot call `Job.update` without a job parameter')
          } else if (!job.id) {
            return reject('cannot call `Job.update` on a job object missing an `id` value')
          } else {
            return resolve(
              self.prepForUpdate(job)
                .then(job =>
                  self.endpoint.update({ jobId: job.id }, self.jobDateToString(job)).$promise
                    .then($unpack)
                )
            )
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
            return resolve(self.endpoint.delete({ jobId: job.id }, job).$promise.then($unpack))
          }
        })
      }

    self.updateFull = (job, jobAddresses, jobSchedules, addedSystemTypes, removedSystemTypes) =>
      self.update(job)
        .then(({ before, after }) =>
          $q.all([
            jobAddresses !== undefined ? self.addresses.update(after, jobAddresses) : undefined,
            jobSchedules !== undefined ? self.schedules.update(after, jobSchedules) : undefined,
            SystemTypeByJob.update({ jobId: after.id }, addedSystemTypes, removedSystemTypes)
          ].filter(x => x !== undefined))
          .then(() => after))

    self.createFull = (job, jobAddresses, jobSchedules) =>
      self.create(job)
        .then(job => $q.all([
          jobAddresses !== undefined ? self.addresses.create(job, jobAddresses) : undefined,
          jobSchedules !== undefined ? self.schedules.create(job, jobSchedules) : undefined
        ].filter(x => x !== undefined)).then(() => job))
  }
}
