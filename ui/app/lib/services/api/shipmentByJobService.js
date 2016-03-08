'use strict'
angular.module('ssiServices')
  .service('ShipmentByJob', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/jobs/:jobId/shipments', {}, {
        query: {method: 'GET'}
      })
    }
  ])
