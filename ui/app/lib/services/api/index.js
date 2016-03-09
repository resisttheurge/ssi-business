// gimme dat angular
import angular from 'angular'

import Addendum from './Addendum'
import AddendumByJob from './AddendumByJob'
import Address from './Address'
import Carrier from './Carrier'
import Contact from './Contact'
import Customer from './Customer'
import Drawing from './Drawing'
import DrawingByJob from './DrawingByJob'
import Job from './Job'
import JobAddresses from './JobAddresses'
import JobSchedules from './JobSchedules'
import Manufacturer from './Manufacturer'
import Mark from './Mark'
import MarkByDrawing from './MarkByDrawing'
import Part from './Part'
import PartOrder from './PartOrder'
import PartOrderByJob from './PartOrderByJob'
import Report from './Report'
import Salesperson from './Salesperson'
import Schedule from './Schedule'
import Shipment from './Shipment'
import ShipmentByJob from './ShipmentByJob'
import ShipmentItem from './ShipmentItem'
import ShipmentItemByShipment from './ShipmentItemByShipment'
import ShippingGroup from './ShippingGroup'
import ShippingGroupByJob from './ShippingGroupByJob'
import ShippingGroupItem from './ShippingGroupItem'
import ShippingGroupItemByShippingGroup from './ShippingGroupItemByShippingGroup'
import ShippingItem from './ShippingItem'
import ShippingItemZone from './ShippingItemZone'
import ShippingItemZoneByShippingItem from './ShippingItemZoneByShippingItem'
import Shop from './Shop'
import SpecialtyItem from './SpecialtyItem'
import SystemType from './SystemType'
import SystemTypeByJob from './SystemTypeByJob'
import User from './User'
import Vendor from './Vendor'
import Zone from './Zone'
import ZoneByJob from './ZoneByJob'

export default
angular
  .module('ssi.services.api.old', [])
  .service('Addendum', Addendum)
  .service('AddendumByJob', AddendumByJob)
  .service('Address', Address)
  .service('Carrier', Carrier)
  .service('Contact', Contact)
  .service('Customer', Customer)
  .service('Drawing', Drawing)
  .service('DrawingByJob', DrawingByJob)
  .service('Job', Job)
  .service('JobAddresses', JobAddresses)
  .service('JobSchedules', JobSchedules)
  .service('Manufacturer', Manufacturer)
  .service('Mark', Mark)
  .service('MarkByDrawing', MarkByDrawing)
  .service('Part', Part)
  .service('PartOrder', PartOrder)
  .service('PartOrderByJob', PartOrderByJob)
  .service('Report', Report)
  .service('Salesperson', Salesperson)
  .service('Schedule', Schedule)
  .service('Shipment', Shipment)
  .service('ShipmentByJob', ShipmentByJob)
  .service('ShipmentItem', ShipmentItem)
  .service('ShipmentItemByShipment', ShipmentItemByShipment)
  .service('ShippingGroup', ShippingGroup)
  .service('ShippingGroupByJob', ShippingGroupByJob)
  .service('ShippingGroupItem', ShippingGroupItem)
  .service('ShippingGroupItemByShippingGroup', ShippingGroupItemByShippingGroup)
  .service('ShippingItem', ShippingItem)
  .service('ShippingItemZone', ShippingItemZone)
  .service('ShippingItemZoneByShippingItem', ShippingItemZoneByShippingItem)
  .service('Shop', Shop)
  .service('SpecialtyItem', SpecialtyItem)
  .service('SystemType', SystemType)
  .service('SystemTypeByJob', SystemTypeByJob)
  .service('User', User)
  .service('Vendor', Vendor)
  .service('Zone', Zone)
  .service('ZoneByJob', ZoneByJob)
