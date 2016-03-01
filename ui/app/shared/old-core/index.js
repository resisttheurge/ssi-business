import angular from 'angular'
import ngUiRouter from 'angular-ui-router'

import carriers from 'old-partials/carriers.html'
import carrierDetail from 'old-partials/carrier-detail.html'
import customers from 'old-partials/customers.html'
import customerDetail from 'old-partials/customer-detail.html'
import jobs from 'old-partials/jobs.html'
import jobDetail from 'old-partials/job-detail.html'
import drawings from 'old-partials/drawings.html'
import drawingDetail from 'old-partials/drawing-detail.html'
import marks from 'old-partials/marks.html'
import markDetail from 'old-partials/mark-detail.html'
import partOrders from 'old-partials/part-orders.html'
import partOrderDetail from 'old-partials/part-order-detail.html'
import shippingGroups from 'old-partials/shipping-groups.html'
import shippingGroupDetail from 'old-partials/shipping-group-detail.html'
import shippingGroupItems from 'old-partials/shipping-group-items.html'
import shippingGroupItemDetail from 'old-partials/shipping-group-item-detail.html'
import shipments from 'old-partials/shipments.html'
import shipmentDetail from 'old-partials/shipment-detail.html'
import shipmentItems from 'old-partials/shipment-items.html'
import shipmentItemDetail from 'old-partials/shipment-item-detail.html'
import specialtyItems from 'old-partials/specialty-items.html'
import specialtyItemDetail from 'old-partials/specialty-item-detail.html'
import systemTypes from 'old-partials/system-types.html'
import systemTypeDetail from 'old-partials/system-type-detail.html'
import zones from 'old-partials/zones.html'
import zoneDetail from 'old-partials/zone-detail.html'
import manufacturers from 'old-partials/manufacturers.html'
import manufacturerDetail from 'old-partials/manufacturer-detail.html'
import parts from 'old-partials/parts.html'
import partDetail from 'old-partials/part-detail.html'
import salespeople from 'old-partials/salespeople.html'
import salespersonDetail from 'old-partials/salesperson-detail.html'
import users from 'old-partials/users.html'
import userDetail from 'old-partials/user-detail.html'
import vendors from 'old-partials/vendors.html'
import vendorDetail from 'old-partials/vendor-detail.html'

export default
  angular.module("ssi.core.old", [ngUiRouter])
    .constant('$routes', {
      'carriers': {
        url: '/carriers',
        template: carriers,
        controller: 'CarrierListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'carriers.detail': {
        url: '/:carrierId',
        template: carrierDetail,
        controller: 'CarrierDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'customers': {
        url: '/customers',
        template: customers,
        controller: 'CustomerListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'customers.detail': {
        url: '/:customerId',
        template: customerDetail,
        controller: 'CustomerDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs': {
        url: '/jobs',
        template: jobs,
        controller: 'JobListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs.detail': {
        url: '/:jobId',
        template: jobDetail,
        controller: 'JobDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs.detail.drawings': {
        url: '/drawings',
        template: drawings,
        controller: 'DrawingListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs.detail.drawings.detail': {
        url: '/:drawingId',
        template: drawingDetail,
        controller: 'DrawingDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs.detail.drawings.detail.marks': {
        url: '/marks',
        template: marks,
        controller: 'MarkListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs.detail.drawings.detail.marks.detail': {
        url: '/:markId',
        template: markDetail,
        controller: 'MarkDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs.detail.partOrders': {
        url: '/part-orders',
        template: partOrders,
        controller: 'PartOrderListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs.detail.partOrders.detail': {
        url: '/:partOrderId',
        template: partOrderDetail,
        controller: 'PartOrderDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs.detail.shippingGroups': {
        url: '/shipping-groups',
        template: shippingGroups,
        controller: 'ShippingGroupListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs.detail.shippingGroups.detail': {
        url: '/:shippingGroupId',
        template: shippingGroupDetail,
        controller: 'ShippingGroupDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs.detail.shippingGroups.detail.items': {
        url: '/items',
        template: shippingGroupItems,
        controller: 'ShippingGroupItemListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs.detail.shippingGroups.detail.items.detail': {
        url: '/:itemId',
        template: shippingGroupItemDetail,
        controller: 'ShippingGroupItemDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs.detail.shipments': {
        url: '/shipments',
        template: shipments,
        controller: 'ShipmentListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs.detail.shipments.detail': {
        url: '/:shipmentId',
        template: shipmentDetail,
        controller: 'ShipmentDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs.detail.shipments.detail.items': {
        url: '/items',
        template: shipmentItems,
        controller: 'ShipmentItemListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs.detail.shipments.detail.items.detail': {
        url: '/:shipmentItemId',
        template: shipmentItemDetail,
        controller: 'ShipmentItemDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs.detail.zones': {
        url: '/zones',
        template: zones,
        controller: 'ZoneListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'jobs.detail.zones.detail': {
        url: '/:zoneId',
        template: zoneDetail,
        controller: 'ZoneDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'manufacturers': {
        url: '/manufacturers',
        template: manufacturers,
        controller: 'ManufacturerListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'manufacturers.detail': {
        url: '/:manufacturerId',
        template: manufacturerDetail,
        controller: 'ManufacturerDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'parts': {
        url: '/parts',
        template: parts,
        controller: 'PartListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'parts.detail': {
        url: '/:partId',
        template: partDetail,
        controller: 'PartDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'salespeople': {
        url: '/salespeople',
        template: salespeople,
        controller: 'SalespersonListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'salespeople.detail': {
        url: '/:salespersonId',
        template: salespersonDetail,
        controller: 'SalespersonDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'specialtyItems': {
        url: '/specialty-items',
        template: specialtyItems,
        controller: 'SpecialtyItemListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'specialtyItems.detail': {
        url: '/:specialtyItemId',
        template: specialtyItemDetail,
        controller: 'SpecialtyItemDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'systemTypes': {
        url: '/system-types',
        template: systemTypes,
        controller: 'SystemTypeListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'systemTypes.detail': {
        url: '/:systemTypeId',
        template: systemTypeDetail,
        controller: 'SystemTypeDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'users': {
        url: '/users',
        template: users,
        controller: 'UserListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN']
        }
      },
      'users.detail': {
        url: '/:userId',
        template: userDetail,
        controller: 'UserDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN']
        }
      },
      'vendors': {
        url: '/vendors',
        template: vendors,
        controller: 'VendorListController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      },
      'vendors.detail': {
        url: '/:vendorId',
        template: vendorDetail,
        controller: 'VendorDetailController',
        data: {
          allowAnonymous: false,
          allowedRoles: ['ADMIN', 'EMPLOYEE']
        }
      }
    })

    .config([
      '$routes',
      '$stateProvider',
      function($routes, $stateProvider) {
        for (var state in $routes) {
          $stateProvider
            .state(state, $routes[state])
        }
      }
    ])

    .name
