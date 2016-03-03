'use strict'
angular.module('ssiServices')
  .service('ShippingGroupItemByShippingGroup', ['$resource', 'endpointUrl',
    function($resource, endpointUrl) {
      this.endpoint = $resource(endpointUrl + '/shipping-groups/:shippingGroupId/items', {}, {
        query: {method: 'GET'}
      })
    }
  ])
