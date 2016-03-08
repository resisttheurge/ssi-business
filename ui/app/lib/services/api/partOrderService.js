'use strict'
angular.module('ssiServices')
  .service('PartOrder', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/part-orders/:partOrderId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{partOrderId: ''}}
      })
    }
  ])
