'use strict'
angular.module('ssiServices')
  .service('ShippingGroup', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/shipping-groups/:shippingGroupId', {}, {
        create: {method: 'POST'},
        update: {method: 'PATCH'},
        query: {method: 'GET', params:{shippingGroupId: ''}}
      })
    }
  ])
