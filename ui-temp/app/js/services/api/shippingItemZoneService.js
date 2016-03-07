'use strict'
angular.module('ssiServices')
  .service('ShippingItemZone', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/shipping-item-zones/:shippingItemZoneId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{shippingItemZoneId: ''}}
      })
    }
  ])
