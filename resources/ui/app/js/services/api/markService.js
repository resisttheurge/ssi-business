'use strict'
angular.module('ssiServices')
  .service('Mark', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/marks/:markId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{markId: ''}}
      })
    }
  ])
