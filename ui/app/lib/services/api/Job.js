export default class Job {
  constructor ($q, $resource, $unpack, endpointUrl, JobAddresses, JobSchedules) {

    var self = this

    self.addresses = JobAddresses
    self.schedules = JobSchedules

    self.endpoint = $resource(endpointUrl + '/jobs/:jobId', {}, {
        create: { method: 'POST' },
        update: { method: 'PATCH' },
        query: { method: 'GET', params:{ jobId: '' } }
      })

    self.list = function (params) {
        return $q(function (resolve, reject) {
          return resolve(self.endpoint.query(params).$promise.then($unpack))
        })
      }

    self.get = function (params) {
        return $q(function (resolve, reject) {
          return resolve(self.endpoint.get(params).$promise.then($unpack))
        })
      }

    self.create = function (job) {
        return $q(function (resolve, reject) {
          if (!job) {
            return reject('cannot call `Job.create` without a job parameter')
          } else if (job.id) {
            return reject('cannot call `Job.create` on a job object that has an existing `id` value')
          } else {
            return resolve(self.endpoint.create(job).$promise.then($unpack))
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
            return resolve(self.endpoint.update({ jobId: job.id }, job).$promise.then($unpack))
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
  }
}
