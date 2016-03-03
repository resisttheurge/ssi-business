'use strict'
angular.module('ssiServices')
  .service('DrawingByJob', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/jobs/:jobId/drawings', {}, {
        query: {method: 'GET'}
      })
    }
  ])
