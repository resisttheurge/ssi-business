// can't stop won't stop
import angular from 'angular'

import home from './home'
import login from './login'
import reset from './reset'

import carrierDetail from './carrier-detail'
import carrierList from './carrier-list'
import customerDetail from './customer-detail'
import customerList from './customer-list'
import drawingDetail from './drawing-detail'
import jobDetail from './job-detail'
import jobList from './job-list'
import manufacturerDetail from './manufacturer-detail'
import manufacturerList from './manufacturer-list'
import markDetail from './mark-detail'
import partDetail from './part-detail'
import partList from './part-list'
import partOrderDetail from './part-order-detail'
import salespersonDetail from './salesperson-detail'
import salespersonList from './salesperson-list'
import shipmentDetail from './shipment-detail'
import shipmentItemDetail from './shipment-item-detail'
import shippingGroupDetail from './shipping-group-detail'
import shippingGroupItemDetail from './shipping-group-item-detail'
import shopDetail from './shop-detail'
import shopList from './shop-list'
import specialtyItemDetail from './specialty-item-detail'
import specialtyItemList from './specialty-item-list'
import systemTypeDetail from './system-type-detail'
import systemTypeList from './system-type-list'
import userDetail from './user-detail'
import userList from './user-list'
import vendorDetail from './vendor-detail'
import vendorList from './vendor-list'
import zoneDetail from './zone-detail'

export const urls = {
  home,
  login,
  reset,
  carrierDetail,
  carrierList,
  customerDetail,
  customerList,
  drawingDetail,
  jobDetail,
  jobList,
  manufacturerDetail,
  manufacturerList,
  markDetail,
  partDetail,
  partList,
  partOrderDetail,
  salespersonDetail,
  salespersonList,
  shipmentDetail,
  shipmentItemDetail,
  shippingGroupDetail,
  shippingGroupItemDetail,
  shopDetail,
  shopList,
  specialtyItemDetail,
  specialtyItemList,
  systemTypeDetail,
  systemTypeList,
  userDetail,
  userList,
  vendorDetail,
  vendorList,
  zoneDetail
}

export default
  angular
    .module('ssi.templates.old', [])
    .constant('urls', urls)
