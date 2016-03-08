'use strict'
angular.module('ssiServices')
  .service('Manufacturer', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/manufacturers/:manufacturerId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{manufacturerId: ''}}
      })
    }
  ])
