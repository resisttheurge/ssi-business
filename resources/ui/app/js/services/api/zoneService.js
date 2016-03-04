'use strict'
angular.module('ssiServices')
  .service('Zone', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/zones/:zoneId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{zoneId: ''}}
      })
    }
  ])
