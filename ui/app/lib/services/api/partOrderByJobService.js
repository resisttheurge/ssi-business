'use strict'
angular.module('ssiServices')
  .service('PartOrderByJob', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/jobs/:jobId/part-orders', {}, {
        query: {method: 'GET'}
      })
    }
  ])
