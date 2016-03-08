'use strict'
angular.module('ssiServices')
  .service('ShipmentItem', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/shipment-items/:shipmentItemId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{shipmentItemId: ''}}
      })
    }
  ])
