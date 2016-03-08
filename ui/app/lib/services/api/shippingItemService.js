'use strict'
angular.module('ssiServices')
  .service('ShippingItem', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/shipping-items/:shippingItemId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{shippingItemId: ''}}
      })
    }
  ])
