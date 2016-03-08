'use strict'
angular.module('ssiServices')
  .service('User', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/users/:userId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{userId: ''}}
      })
    }
  ])
