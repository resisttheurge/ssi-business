'use strict'
angular.module('ssiServices')
  .service('Shipment', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/shipments/:shipmentId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{shipmentId: ''}}
      })
    }
  ])
