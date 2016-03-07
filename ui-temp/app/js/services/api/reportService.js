'use strict'
angular.module('ssiServices')
  .service('Report', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/reports/:reportTitle', {}, {
        generate: {method: 'POST'}
      })
    }
  ])
