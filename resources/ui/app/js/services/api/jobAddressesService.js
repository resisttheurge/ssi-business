'use strict'
angular.module('ssiServices')
  .service('JobAddresses', [
    '$q', '$unpack', '$resource', 'endpointUrl',
    function($q, $unpack, $resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/jobs/:jobId/addresses', {}, {
        create: {method: 'POST'},
        query: {method: 'GET'}
      })

      this.get = function(job) {
        return $q(function(resolve, reject){
          if(!job || !job.id){
            return reject('cannot call `JobAddresses.get` without an initialized job object as a parameter')
          } else {
            return resolve(this.endpoint.get({jobId: job.id}).$promise.then($unpack))
          }
        })
      }

      this.create = function(job, addresses) {
        return $q(function(resolve, reject){
          if(!job || !job.id){
            return reject('cannot call `JobAddresses.create` without an initialized job object as a parameter')
          } else {
            return resolve(this.endpoint.create({jobId: job.id}, addresses).$promise.then($unpack))
          }
        })
      }
    }
  ])
