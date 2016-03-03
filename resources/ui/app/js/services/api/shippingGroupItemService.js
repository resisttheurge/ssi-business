'use strict'
angular.module('ssiServices')
  .service('ShippingGroupItem', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/shipping-group-items/:shippingGroupItemId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{shippingGroupItemId: ''}}
      })
    }
  ])
