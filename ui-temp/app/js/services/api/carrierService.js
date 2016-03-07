'use strict'
angular.module('ssiServices')
  .service('Carrier', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/carriers/:carrierId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{carrierId: ''}}
      })
    }
  ])
