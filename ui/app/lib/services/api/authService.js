'use strict'
angular.module('ssiServices')
  .service('AuthService', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/auth', {}, {
        login: {method: 'POST'}
      })
    }
  ])
