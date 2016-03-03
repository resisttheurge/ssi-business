'use strict'
angular.module('ssiServices')
  .service('AddendumByJob', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/jobs/:jobId/addenda', {}, {
        query: {method: 'GET'}
      })
    }
  ])
