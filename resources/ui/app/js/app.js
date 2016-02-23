'use strict'

var ssiApp =
  angular.module("ssiApp",
    [
      'ngRoute',
      'ssiControllers',
      'ssiServices'
    ]
  )

ssiApp.constant('endpointUrl', 'http://10.1.1.167/api')

ssiApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/carriers', {
        templateUrl: 'partials/carriers.html',
        controller: 'CarrierListController'
      })
      .when('/carriers/:carrierId', {
        templateUrl: 'partials/carrier-detail.html',
        controller: 'CarrierDetailController'
      })
      .when('/customers', {
        templateUrl: 'partials/customers.html',
        controller: 'CustomerListController'
      })
      .when('/customers/:customerId', {
        templateUrl: 'partials/customer-detail.html',
        controller: 'CustomerDetailController'
      })
      .when('/jobs', {
        templateUrl: 'partials/jobs.html',
        controller: 'JobListController'
      })
      .when('/jobs/:jobId', {
        templateUrl: 'partials/job-detail.html',
        controller: 'JobDetailController'
      })
      .when('/jobs/:jobId/drawings', {
        templateUrl: 'partials/drawings.html',
        controller: 'DrawingListController'
      })
      .when('/jobs/:jobId/drawings/:drawingId', {
        templateUrl: 'partials/drawing-detail.html',
        controller: 'DrawingDetailController'
      })
      .when('/jobs/:jobId/drawings/:drawingId/marks', {
        templateUrl: 'partials/marks.html',
        controller: 'MarkListController'
      })
      .when('/jobs/:jobId/drawings/:drawingId/marks/:markId', {
        templateUrl: 'partials/mark-detail.html',
        controller: 'MarkDetailController'
      })
      .when('/jobs/:jobId/part-orders', {
        templateUrl: 'partials/part-orders.html',
        controller: 'PartOrderListController'
      })
      .when('/jobs/:jobId/part-orders/:partOrderId', {
        templateUrl: 'partials/part-order-detail.html',
        controller: 'PartOrderDetailController'
      })
      .when('/jobs/:jobId/shipping-groups', {
        templateUrl: 'partials/shipping-groups.html',
        controller: 'ShippingGroupListController'
      })
      .when('/jobs/:jobId/shipping-groups/:shippingGroupId', {
        templateUrl: 'partials/shipping-group-detail.html',
        controller: 'ShippingGroupDetailController'
      })
      .when('/jobs/:jobId/shipping-groups/:shippingGroupId/items', {
        templateUrl: 'partials/shipping-group-items.html',
        controller: 'ShippingGroupItemListController'
      })
      .when('/jobs/:jobId/shipping-groups/:shippingGroupId/items/:itemId', {
        templateUrl: 'partials/shipping-group-item-detail.html',
        controller: 'ShippingGroupItemDetailController'
      })
      .when('/jobs/:jobId/shipments', {
        templateUrl: 'partials/shipments.html',
        controller: 'ShipmentListController'
      })
      .when('/jobs/:jobId/shipments/:shipmentId', {
        templateUrl: 'partials/shipment-detail.html',
        controller: 'ShipmentDetailController'
      })
      .when('/jobs/:jobId/shipments/:shipmentId/items', {
        templateUrl: 'partials/shipment-items.html',
        controller: 'ShipmentItemListController'
      })
      .when('/jobs/:jobId/shipments/:shipmentId/items/:itemId', {
        templateUrl: 'partials/shipment-item-detail.html',
        controller: 'ShipmentItemDetailController'
      })
      .when('/jobs/:jobId/zones', {
        templateUrl: 'partials/zones.html',
        controller: 'ZoneListController'
      })
      .when('/jobs/:jobId/zones/:zoneId', {
        templateUrl: 'partials/zone-detail.html',
        controller: 'ZoneDetailController'
      })
      .when('/manufacturers', {
        templateUrl: 'partials/manufacturers.html',
        controller: 'ManufacturerListController'
      })
      .when('/manufacturers/:manufacturerId', {
        templateUrl: 'partials/manufacturer-detail.html',
        controller: 'ManufacturerDetailController'
      })
      .when('/parts', {
        templateUrl: 'partials/parts.html',
        controller: 'PartListController'
      })
      .when('/parts/:partId', {
        templateUrl: 'partials/part-detail.html',
        controller: 'PartDetailController'
      })
      .when('/salespeople', {
        templateUrl: 'partials/salespeople.html',
        controller: 'SalespersonListController'
      })
      .when('/salespeople/:salespersonId', {
        templateUrl: 'partials/salesperson-detail.html',
        controller: 'SalespersonDetailController'
      })
      .when('/specialty-items', {
        templateUrl: 'partials/specialty-items.html',
        controller: 'SpecialtyItemListController'
      })
      .when('/specialty-items/:specialtyItemId', {
        templateUrl: 'partials/specialty-item-detail.html',
        controller: 'SpecialtyItemDetailController'
      })
      .when('/system-types', {
        templateUrl: 'partials/system-types.html',
        controller: 'SystemTypeListController'
      })
      .when('/system-types/:systemTypeId', {
        templateUrl: 'partials/system-type-detail.html',
        controller: 'SystemTypeDetailController'
      })
      .when('/users', {
        templateUrl: 'partials/users.html',
        controller: 'UserListController'
      })
      .when('/users/:userId', {
        templateUrl: 'partials/user-detail.html',
        controller: 'UserDetailController'
      })
      .when('/vendors', {
        templateUrl: 'partials/vendors.html',
        controller: 'VendorListController'
      })
      .when('/vendors/:vendorId', {
        templateUrl: 'partials/vendor-detail.html',
        controller: 'VendorDetailController'
      })
      .otherwise({
        redirectTo: '/jobs'
      })
  }
])
