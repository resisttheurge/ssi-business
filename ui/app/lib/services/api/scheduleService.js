'use strict'
angular.module('ssiServices')
  .service('Schedule', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/schedules/:scheduleId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{scheduleId: ''}}
      })
    }
  ])
