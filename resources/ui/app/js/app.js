'use strict'

var ssiApp = angular.module(
  "ssiApp",
  [
    'md.data.table',
    'ngAnimate',
    'ngAria',
    'ngResource',
    'ngRoute',
    'ngMaterial',
    'ssiControllers',
    'ssi.filters',
    'ssiServices'
  ]
)

ssiApp.constant('endpointUrl', 'http://10.1.1.151/api')

ssiApp.constant('routes', {
  '/login': {
    templateUrl: 'partials/login.html',
    controller: 'LoginController',
    access: {
      allowAnonymous: true,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/home': {
    templateUrl: 'partials/home.html',
    controller: 'HomeController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/carriers': {
    templateUrl: 'partials/carriers.html',
    controller: 'CarrierListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/carriers/:carrierId': {
    templateUrl: 'partials/carrier-detail.html',
    controller: 'CarrierDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/customers': {
    templateUrl: 'partials/customers.html',
    controller: 'CustomerListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/customers/:customerId': {
    templateUrl: 'partials/customer-detail.html',
    controller: 'CustomerDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs': {
    templateUrl: 'partials/jobs.html',
    controller: 'JobListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId': {
    templateUrl: 'partials/job-detail.html',
    controller: 'JobDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/drawings': {
    templateUrl: 'partials/drawings.html',
    controller: 'DrawingListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/drawings/:drawingId': {
    templateUrl: 'partials/drawing-detail.html',
    controller: 'DrawingDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/drawings/:drawingId/marks': {
    templateUrl: 'partials/marks.html',
    controller: 'MarkListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/drawings/:drawingId/marks/:markId': {
    templateUrl: 'partials/mark-detail.html',
    controller: 'MarkDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/part-orders': {
    templateUrl: 'partials/part-orders.html',
    controller: 'PartOrderListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/part-orders/:partOrderId': {
    templateUrl: 'partials/part-order-detail.html',
    controller: 'PartOrderDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/shipping-groups': {
    templateUrl: 'partials/shipping-groups.html',
    controller: 'ShippingGroupListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/shipping-groups/:shippingGroupId': {
    templateUrl: 'partials/shipping-group-detail.html',
    controller: 'ShippingGroupDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/shipping-groups/:shippingGroupId/items': {
    templateUrl: 'partials/shipping-group-items.html',
    controller: 'ShippingGroupItemListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/shipping-groups/:shippingGroupId/items/:itemId': {
    templateUrl: 'partials/shipping-group-item-detail.html',
    controller: 'ShippingGroupItemDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/shipments': {
    templateUrl: 'partials/shipments.html',
    controller: 'ShipmentListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/shipments/:shipmentId': {
    templateUrl: 'partials/shipment-detail.html',
    controller: 'ShipmentDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/shipments/:shipmentId/items': {
    templateUrl: 'partials/shipment-items.html',
    controller: 'ShipmentItemListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/shipments/:shipmentId/items/:shipmentItemId': {
    templateUrl: 'partials/shipment-item-detail.html',
    controller: 'ShipmentItemDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/zones': {
    templateUrl: 'partials/zones.html',
    controller: 'ZoneListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/zones/:zoneId': {
    templateUrl: 'partials/zone-detail.html',
    controller: 'ZoneDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/manufacturers': {
    templateUrl: 'partials/manufacturers.html',
    controller: 'ManufacturerListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/manufacturers/:manufacturerId': {
    templateUrl: 'partials/manufacturer-detail.html',
    controller: 'ManufacturerDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/parts': {
    templateUrl: 'partials/parts.html',
    controller: 'PartListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/parts/:partId': {
    templateUrl: 'partials/part-detail.html',
    controller: 'PartDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/salespeople': {
    templateUrl: 'partials/salespeople.html',
    controller: 'SalespersonListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/salespeople/:salespersonId': {
    templateUrl: 'partials/salesperson-detail.html',
    controller: 'SalespersonDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/specialty-items': {
    templateUrl: 'partials/specialty-items.html',
    controller: 'SpecialtyItemListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/specialty-items/:specialtyItemId': {
    templateUrl: 'partials/specialty-item-detail.html',
    controller: 'SpecialtyItemDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/system-types': {
    templateUrl: 'partials/system-types.html',
    controller: 'SystemTypeListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/system-types/:systemTypeId': {
    templateUrl: 'partials/system-type-detail.html',
    controller: 'SystemTypeDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/users': {
    templateUrl: 'partials/users.html',
    controller: 'UserListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN']
    }
  },
  '/users/:userId': {
    templateUrl: 'partials/user-detail.html',
    controller: 'UserDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN']
    }
  },
  '/vendors': {
    templateUrl: 'partials/vendors.html',
    controller: 'VendorListController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/vendors/:vendorId': {
    templateUrl: 'partials/vendor-detail.html',
    controller: 'VendorDetailController',
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  }
})

ssiApp.config([
  'routes',
  '$routeProvider',
  function(routes, $routeProvider) {
    for (var path in routes) {
      $routeProvider.when(path, routes[path])
    }
    $routeProvider.otherwise({redirectTo: '/home'})
  }
])
