'use strict'
angular.module('ssiServices')
  .service('Drawing', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/drawings/:drawingId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{drawingId: ''}}
      })
    }
  ])
