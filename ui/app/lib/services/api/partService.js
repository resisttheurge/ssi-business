'use strict'
angular.module('ssiServices')
  .service('Part', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/parts/:partId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{partId: ''}}
      })
    }
  ])
