import angular from 'angular'
import ngResource from 'angular-resource'

export default
  angular.module('ssi.services.old.api', [ ngResource ])

    .factory('Addendum', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/addenda/:addendumId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{addendumId: ''}}
        })
      }
    ])

    .factory('Address', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/addresses/:addressId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{addressId: ''}}
        })
      }
    ])

    .factory('Carrier', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/carriers/:carrierId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{carrierId: ''}}
        })
      }
    ])

    .factory('Contact', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/contacts/:contactId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{contactId: ''}}
        })
      }
    ])

    .factory('Customer', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/customers/:customerId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{customerId: ''}}
        })
      }
    ])

    .factory('Drawing', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/drawings/:drawingId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{drawingId: ''}}
        })
      }
    ])

    .factory('MarkByDrawing', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/drawings/:drawingId/marks`, {}, {
          query: {method: 'GET'}
        })
      }
    ])

    .factory('Job', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/jobs/:jobId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{jobId: ''}}
        })
      }
    ])

    .factory('AddendumByJob', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/jobs/:jobId/addenda`, {}, {
          query: {method: 'GET'}
        })
      }
    ])

    .factory('JobAddresses', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/jobs/:jobId/addresses`, {}, {
          create: {method: 'POST'},
          query: {method: 'GET'}
        })
      }
    ])

    .factory('JobSchedules', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/jobs/:jobId/schedules`, {}, {
          query: {method: 'GET'}
        })
      }
    ])

    .factory('DrawingByJob', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/jobs/:jobId/drawings`, {}, {
          query: {method: 'GET'}
        })
      }
    ])

    .factory('PartOrderByJob', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/jobs/:jobId/part-orders`, {}, {
          query: {method: 'GET'}
        })
      }
    ])

    .factory('ShippingGroupByJob', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/jobs/:jobId/shipping-groups`, {}, {
          query: {method: 'GET'}
        })
      }
    ])

    .factory('ShipmentByJob', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/jobs/:jobId/shipments`, {}, {
          query: {method: 'GET'}
        })
      }
    ])

    .factory('SystemTypeByJob', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/jobs/:jobId/system-types`, {}, {
          add: {method: 'POST'},
          remove: {method: 'DELETE'},
          query: {method: 'GET'}
        })
      }
    ])

    .factory('ZoneByJob', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/jobs/:jobId/zones`, {}, {
          query: {method: 'GET'}
        })
      }
    ])

    .factory('Manufacturer', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/manufacturers/:manufacturerId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{manufacturerId: ''}}
        })
      }
    ])

    .factory('Mark', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/marks/:markId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{markId: ''}}
        })
      }
    ])

    .factory('PartOrder', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/part-orders/:partOrderId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{partOrderId: ''}}
        })
      }
    ])

    .factory('Part', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/parts/:partId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{partId: ''}}
        })
      }
    ])

    .factory('Report', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/reports/:reportTitle`, {}, {
          generate: {method: 'POST'}
        })
      }
    ])

    .factory('Salesperson', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/salespeople/:salespersonId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{salespersonId: ''}}
        })
      }
    ])

    .factory('Schedule', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/schedules/:scheduleId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{scheduleId: ''}}
        })
      }
    ])

    .factory('Shipment', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/shipments/:shipmentId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{shipmentId: ''}}
        })
      }
    ])

    .factory('ShipmentItemByShipment', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/shipments/:shipmentId/items`, {}, {
          query: {method: 'GET'}
        })
      }
    ])

    .factory('ShipmentItem', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/shipment-items/:shipmentItemId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{shipmentItemId: ''}}
        })
      }
    ])

    .factory('ShippingGroup', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/shipping-groups/:shippingGroupId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{shippingGroupId: ''}}
        })
      }
    ])

    .factory('ShippingGroupItemByShippingGroup', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/shipping-groups/:shippingGroupId/items`, {}, {
          query: {method: 'GET'}
        })
      }
    ])

    .factory('ShippingGroupItem', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/shipping-group-items/:shippingGroupItemId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{shippingGroupItemId: ''}}
        })
      }
    ])

    .factory('ShippingItem', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/shipping-items/:shippingItemId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{shippingItemId: ''}}
        })
      }
    ])

    .factory('ShippingItemZoneByShippingItem', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/shipping-items/:shippingItemId/zones`, {}, {
          query: {method: 'GET'}
        })
      }
    ])

    .factory('ShippingItemZone', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/shipping-item-zones/:shippingItemZoneId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{shippingItemZoneId: ''}}
        })
      }
    ])

    .factory('Shop', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/shops/:shopId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{shopId: ''}}
        })
      }
    ])

    .factory('SpecialtyItem', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/specialty-items/:specialtyItemId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{specialtyItemId: ''}}
        })
      }
    ])

    .factory('SystemType', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/system-types/:systemTypeId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{systemTypeId: ''}}
        })
      }
    ])

    .factory('User', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/users/:userId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{userId: ''}}
        })
      }
    ])

    .factory('Vendor', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/vendors/:vendorId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{vendorId: ''}}
        })
      }
    ])

    .factory('Zone', ['$resource', '$endpoint',
      function($resource, $endpoint) {
        return $resource(`${$endpoint}/zones/:zoneId`, {}, {
          create: {method: 'POST'},
          update: {method: 'PATCH'},
          query: {method: 'GET', params:{zoneId: ''}}
        })
      }
    ])

    .name
