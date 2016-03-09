import { urls } from 'templates'
import { controllers } from 'controllers'

export const routes = {
  '/login': {
    templateUrl: urls.login,
    controller: controllers.LoginController.name,
    controllerAs: '$login',
    access: {
      allowAnonymous: true,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/carriers': {
    templateUrl: urls.carrierList,
    controller: controllers.CarrierListController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/carriers/:carrierId': {
    templateUrl: urls.carrierDetail,
    controller: controllers.CarrierDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/customers': {
    templateUrl: urls.customerList,
    controller: controllers.CustomerListController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/customers/:customerId': {
    templateUrl: urls.customerDetail,
    controller: controllers.CustomerDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs': {
    templateUrl: urls.jobList,
    controller: controllers.JobListController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId': {
    templateUrl: urls.jobDetail,
    controller: controllers.JobDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/drawings': {
    templateUrl: urls.drawingList,
    controller: controllers.DrawingListController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/drawings/:drawingId': {
    templateUrl: urls.drawingDetail,
    controller: controllers.DrawingDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/drawings/:drawingId/marks': {
    templateUrl: urls.markList,
    controller: controllers.MarkListController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/drawings/:drawingId/marks/:markId': {
    templateUrl: urls.markDetail,
    controller: controllers.MarkDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/part-orders': {
    templateUrl: urls.partLoaderList,
    controller: controllers.PartOrderListController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/part-orders/:partOrderId': {
    templateUrl: urls.partOrderDetail,
    controller: controllers.PartOrderDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/shipping-groups': {
    templateUrl: urls.shippingGroupList,
    controller: controllers.ShippingGroupListController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/shipping-groups/:shippingGroupId': {
    templateUrl: urls.shippingGroupDetail,
    controller: controllers.ShippingGroupDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/shipping-groups/:shippingGroupId/items': {
    templateUrl: urls.shippingGroupItemList,
    controller: controllers.ShippingGroupItemListController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/shipping-groups/:shippingGroupId/items/:itemId': {
    templateUrl: urls.shippingGroupItemDetail,
    controller: controllers.ShippingGroupItemDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/shipments': {
    templateUrl: urls.shipmentList,
    controller: controllers.ShipmentListController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/shipments/:shipmentId': {
    templateUrl: urls.shipmentDetail,
    controller: controllers.ShipmentDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/shipments/:shipmentId/items': {
    templateUrl: urls.shipmentItemList,
    controller: controllers.ShipmentItemListController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/shipments/:shipmentId/items/:shipmentItemId': {
    templateUrl: urls.shipmentItemDetail,
    controller: controllers.ShipmentItemDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/zones': {
    templateUrl: urls.zoneList,
    controller: controllers.ZoneListController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/jobs/:jobId/zones/:zoneId': {
    templateUrl: urls.zoneDetail,
    controller: controllers.ZoneDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/manufacturers': {
    templateUrl: urls.manufacturerList,
    controller: controllers.ManufacturerListController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/manufacturers/:manufacturerId': {
    templateUrl: urls.manufacturerDetail,
    controller: controllers.ManufacturerDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/parts': {
    templateUrl: urls.partList,
    controller: controllers.PartListController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/parts/:partId': {
    templateUrl: urls.partDetail,
    controller: controllers.PartDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/salespeople': {
    templateUrl: urls.salespersonList,
    controller: controllers.PartDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/salespeople/:salespersonId': {
    templateUrl: urls.salespersonDetail,
    controller: controllers.SalespersonDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/specialty-items': {
    templateUrl: urls.specialtyItemList,
    controller: controllers.SpecialtyItemListController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/specialty-items/:specialtyItemId': {
    templateUrl: urls.specialtyItemDetail,
    controller: controllers.SpecialtyItemDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/system-types': {
    templateUrl: urls.systemTypeList,
    controller: controllers.SystemTypeListController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/system-types/:systemTypeId': {
    templateUrl: urls.systemTypeDetail,
    controller: controllers.SystemTypeDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/users': {
    templateUrl: urls.userList,
    controller: controllers.UserListController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN']
    }
  },
  '/users/:userId': {
    templateUrl: urls.userDetail,
    controller: controllers.UserDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN']
    }
  },
  '/vendors': {
    templateUrl: urls.vendorList,
    controller: controllers.VendorListController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  },
  '/vendors/:vendorId': {
    templateUrl: urls.vendorDetail,
    controller: controllers.VendorDetailController.name,
    access: {
      allowAnonymous: false,
      allowedRoles: ['ADMIN', 'EMPLOYEE']
    }
  }
}

export default routes
