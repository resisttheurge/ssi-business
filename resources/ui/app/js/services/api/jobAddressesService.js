'use strict'
angular.module('ssiServices')
  .service('JobAddresses', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/jobs/:jobId/addresses', {}, {
        create: {method: 'POST'},
        query: {method: 'GET'}
      })
    }
  ])
