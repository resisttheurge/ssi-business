// can't stop won't stop
import angular from 'angular'

import home from './home'
import login from './login'

import carrierDetail from './carrier-detail'
import carrierList from './carrier-list'
import customerDetail from './customer-detail'
import customerList from './customer-list'
import drawingDetail from './drawing-detail'
import drawingList from './drawing-list'
import jobDetail from './job-detail'
import jobList from './job-list'
import manufacturerDetail from './manufacturer-detail'
import manufacturerList from './manufacturer-list'
import markDetail from './mark-detail'
import markList from './mark-list'
import partDetail from './part-detail'
import partList from './part-list'
import partOrderDetail from './part-order-detail'
import partOrderList from './part-order-list'
import salespersonDetail from './salesperson-detail'
import salespersonList from './salesperson-list'
import shipmentDetail from './shipment-detail'
import shipmentList from './shipment-list'
import shipmentItemDetail from './shipment-item-detail'
import shipmentItemList from './shipment-item-list'
import shippingGroupDetail from './shipping-group-detail'
import shippingGroupList from './shipping-group-list'
import shippingGroupItemDetail from './shipping-group-item-detail'
import shippingGroupItemList from './shipping-group-item-list'
import specialtyItemDetail from './specialty-item-detail'
import specialtyItemList from './specialty-item-list'
import systemTypeDetail from './system-type-detail'
import systemTypeList from './system-type-list'
import userDetail from './user-detail'
import userList from './user-list'
import vendorDetail from './vendor-detail'
import vendorList from './vendor-list'
import zoneDetail from './zone-detail'
import zoneList from './zone-list'

export const urls = {
  home,
  login,
  carrierDetail,
  carrierList,
  customerDetail,
  customerList,
  drawingDetail,
  drawingList,
  jobDetail,
  jobList,
  manufacturerDetail,
  manufacturerList,
  markDetail,
  markList,
  partDetail,
  partList,
  partOrderDetail,
  partOrderList,
  salespersonDetail,
  salespersonList,
  shipmentDetail,
  shipmentList,
  shipmentItemDetail,
  shipmentItemList,
  shippingGroupDetail,
  shippingGroupList,
  shippingGroupItemDetail,
  shippingGroupItemList,
  specialtyItemDetail,
  specialtyItemList,
  systemTypeDetail,
  systemTypeList,
  userDetail,
  userList,
  vendorDetail,
  vendorList,
  zoneDetail,
  zoneList
}

export default
  angular
    .module('ssi.templates.old', [])
    .constant('urls', urls)
