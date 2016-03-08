'use strict'
angular.module('ssiServices')
  .service('ShippingItemZoneByShippingItem', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/shipping-items/:shippingItemId/zones', {}, {
        query: {method: 'GET'}
      })
    }
  ])
