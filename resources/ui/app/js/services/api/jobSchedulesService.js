'use strict'
angular.module('ssiServices')
  .service('JobSchedules', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/jobs/:jobId/schedules', {}, {
        query: {method: 'GET'}
      })
    }
  ])
