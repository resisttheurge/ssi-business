export default class JobSchedules {
  /*@ngInject*/
  constructor ($q, $resource, $unpack, endpoint) {
      this.endpoint = $resource(endpoint + '/jobs/:jobId/schedules', {}, {
        query: { method: 'GET' }
      })

      this.get = function (job) {
        return $q(function (resolve, reject) {
          if (!job || !job.id) {
            return reject('cannot call `JobSchedules.get` without an initialized job object as a parameter')
          } else {
            return resolve(this.endpoint.query({ jobId: job.id }).$promise.then($unpack))
          }
        })
      }
    }
}
