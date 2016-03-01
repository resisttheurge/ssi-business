import angular from 'angular'

import carrierControllers from './carrierControllers'
import coreControllers from './coreControllers'
import customerControllers from './customerControllers'
import drawingControllers from './drawingControllers'
import jobControllers from './jobControllers'
import manufacturerControllers from './manufacturerControllers'
import markControllers from './markControllers'
import partControllers from './partControllers'
import partOrderControllers from './partOrderControllers'
import salespersonControllers from './salespersonControllers'
import shipmentControllers from './shipmentControllers'
import shipmentItemControllers from './shipmentItemControllers'
import shippingGroupControllers from './shippingGroupControllers'
import shippingGroupItemControllers from './shippingGroupItemControllers'
import specialtyItemControllers from './specialtyItemControllers'
import systemTypeControllers from './systemTypeControllers'
import userControllers from './userControllers'
import vendorControllers from './vendorControllers'
import zoneControllers from './zoneControllers'

export default
  angular.module('ssi.controllers.old', [
    carrierControllers,
    coreControllers,
    customerControllers,
    drawingControllers,
    jobControllers,
    manufacturerControllers,
    markControllers,
    partControllers,
    partOrderControllers,
    salespersonControllers,
    shipmentControllers,
    shipmentItemControllers,
    shippingGroupControllers,
    shippingGroupItemControllers,
    specialtyItemControllers,
    systemTypeControllers,
    userControllers,
    vendorControllers,
    zoneControllers
  ])
    .name
