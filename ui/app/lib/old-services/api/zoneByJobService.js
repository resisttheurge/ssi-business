'use strict'
angular.module('ssiServices')
  .service('ZoneByJob', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/jobs/:jobId/zones', {}, {
        query: {method: 'GET'}
      })
    }
  ])
