'use strict'

var ssiServices = angular.module('ssiServices', ['ngResource'])

ssiServices.factory('Job', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId', {}, {
      query: {method: 'GET', params:{jobId: ''}}
    })
  }
])
