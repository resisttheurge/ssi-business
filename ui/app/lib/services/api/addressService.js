'use strict'
angular.module('ssiServices')
  .service('Address', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/addresses/:addressId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{addressId: ''}}
      })
    }
  ])
