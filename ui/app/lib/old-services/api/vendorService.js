'use strict'
angular.module('ssiServices')
  .service('Vendor', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/vendors/:vendorId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{vendorId: ''}}
      })
    }
  ])
