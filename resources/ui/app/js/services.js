'use strict'

var ssiServices = angular.module('ssiServices', ['ngResource'])

ssiServices.factory('Addendum', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/addenda/:addendumId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{addendumId: ''}}
    })
  }
])

ssiServices.factory('Address', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/addresses/:addressId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{addressId: ''}}
    })
  }
])

ssiServices.factory('Auth', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/auth', {}, {
      login: {method: 'POST'}
    })
  }
])

ssiServices.factory('Carrier', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/carriers/:carrierId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{carrierId: ''}}
    })
  }
])

ssiServices.factory('Contact', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/contacts/:contactId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{contactId: ''}}
    })
  }
])

ssiServices.factory('Customer', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/customers/:customerId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{customerId: ''}}
    })
  }
])

ssiServices.factory('Drawing', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/drawings/:drawingId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{drawingId: ''}}
    })
  }
])

ssiServices.factory('MarkByDrawing', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/drawings/:drawingId/marks', {}, {
      query: {method: 'GET'}
    })
  }
])

ssiServices.factory('Job', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{jobId: ''}}
    })
  }
])

ssiServices.factory('AddendumByJob', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId/addenda', {}, {
      query: {method: 'GET'}
    })
  }
])

ssiServices.factory('JobAddresses', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId/addresses', {}, {
      create: {method: 'POST'},
      query: {method: 'GET'}
    })
  }
])

ssiServices.factory('JobSchedules', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId/schedules', {}, {
      query: {method: 'GET'}
    })
  }
])

ssiServices.factory('DrawingByJob', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId/drawings', {}, {
      query: {method: 'GET'}
    })
  }
])

ssiServices.factory('ShippingGroupByJob', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId/shipping-groups', {}, {
      query: {method: 'GET'}
    })
  }
])

ssiServices.factory('SystemTypeByJob', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId/system-types', {}, {
      add: {method: 'POST'},
      remove: {method: 'DELETE'},
      query: {method: 'GET'}
    })
  }
])

ssiServices.factory('ZoneByJob', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/jobs/:jobId/zones', {}, {
      query: {method: 'GET'}
    })
  }
])

ssiServices.factory('Manufacturer', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/manufacturers/:manufacturerId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{manufacturerId: ''}}
    })
  }
])

ssiServices.factory('Mark', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/marks/:markId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{markId: ''}}
    })
  }
])

ssiServices.factory('PartOrder', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/part-orders/:partOrderId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{partOrderId: ''}}
    })
  }
])

ssiServices.factory('Part', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/parts/:partId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{partId: ''}}
    })
  }
])

ssiServices.factory('Report', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/reports/:reportTitle', {}, {
      generate: {method: 'POST'}
    })
  }
])

ssiServices.factory('Salesperson', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/salespeople/:salespersonId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{salespersonId: ''}}
    })
  }
])

ssiServices.factory('Schedule', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/schedules/:scheduleId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{scheduleId: ''}}
    })
  }
])

ssiServices.factory('Shipment', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipments/:shipmentId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{shipmentId: ''}}
    })
  }
])

ssiServices.factory('ShipmentItemByShipment', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipments/:shipmentId/items', {}, {
      query: {method: 'GET'}
    })
  }
])

ssiServices.factory('ShipmentItem', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipment-items/:shipmentItemId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{shipmentItemId: ''}}
    })
  }
])

ssiServices.factory('ShippingGroup', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipping-groups/:shippingGroupId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{shippingGroupId: ''}}
    })
  }
])

ssiServices.factory('ShippingGroupItemByShippingGroup', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipping-groups/:shippingGroupId/items', {}, {
      query: {method: 'GET'}
    })
  }
])

ssiServices.factory('ShippingGroupItem', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipping-group-items/:shippingGroupItemId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{shippingGroupItemId: ''}}
    })
  }
])

ssiServices.factory('ShippingItem', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipping-items/:shippingItemId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{shippingItemId: ''}}
    })
  }
])

ssiServices.factory('ShippingItemZoneByShippingItem', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipping-items/:shippingItemId/zones', {}, {
      query: {method: 'GET'}
    })
  }
])

ssiServices.factory('ShippingItemZone', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shipping-item-zones/:shippingItemZoneId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{shippingItemZoneId: ''}}
    })
  }
])

ssiServices.factory('Shop', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/shops/:shopId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{shopId: ''}}
    })
  }
])

ssiServices.factory('SpecialtyItem', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/specialty-items/:specialtyItemId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{specialtyItemId: ''}}
    })
  }
])

ssiServices.factory('SystemType', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/system-types/:systemTypeId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{systemTypeId: ''}}
    })
  }
])

ssiServices.factory('User', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/users/:userId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{userId: ''}}
    })
  }
])

ssiServices.factory('Vendor', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/vendors/:vendorId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{vendorId: ''}}
    })
  }
])

ssiServices.factory('Zone', ['$resource', 'endpointUrl',
  function($resource, endpointUrl) {
    return $resource(endpointUrl + '/zones/:zoneId', {}, {
      create: {method: 'POST'},
      update: {method: 'PATCH'},
      query: {method: 'GET', params:{zoneId: ''}}
    })
  }
])
