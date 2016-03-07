'use strict'
angular.module('ssiServices')
  .service('SystemTypeByJob', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/jobs/:jobId/system-types', {}, {
        add: {method: 'POST'},
        remove: {method: 'DELETE'},
        query: {method: 'GET'}
      })
    }
  ])
