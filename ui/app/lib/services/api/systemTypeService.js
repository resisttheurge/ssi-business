'use strict'
angular.module('ssiServices')
  .service('SystemType', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/system-types/:systemTypeId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{systemTypeId: ''}}
      })
    }
  ])
