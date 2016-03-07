'use strict'
angular.module('ssiServices')
  .service('Addendum', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/addenda/:addendumId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{addendumId: ''}}
      })
    }
  ])
