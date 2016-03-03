'use strict'
angular.module('ssiServices')
  .service('MarkByDrawing', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/drawings/:drawingId/marks', {}, {
        query: {method: 'GET'}
      })
    }
  ])
