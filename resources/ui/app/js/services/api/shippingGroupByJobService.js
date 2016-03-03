'use strict'
angular.module('ssiServices')
  .service('ShippingGroupByJob', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/jobs/:jobId/shipping-groups', {}, {
        query: {method: 'GET'}
      })
    }
  ])
