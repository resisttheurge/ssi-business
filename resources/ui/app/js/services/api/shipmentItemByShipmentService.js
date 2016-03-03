'use strict'
angular.module('ssiServices')
  .service('ShipmentItemByShipment', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/shipments/:shipmentId/items', {}, {
        query: {method: 'GET'}
      })
    }
  ])
