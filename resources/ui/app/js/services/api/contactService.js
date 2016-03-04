'use strict'
angular.module('ssiServices')
  .service('Contact', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/contacts/:contactId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{contactId: ''}}
      })
    }
  ])
