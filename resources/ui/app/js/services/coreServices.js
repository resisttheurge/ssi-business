'use strict'

var coreServices = angular.module('coreServices', [])

coreServices.factory(
  'userService',
  function() {

    var user = {
      isLoggedIn: false,
      username: '',
      roles: []
    }

    var reset = function() {
      user.isLoggedIn = false
      user.username = ''
      user.roles = []
    }

    return {
      user: user,
      logout: reset
    }

  }
)

coreServices.factory(
  'selectionService',
  function() {
    var selected = {
      job: undefined,
      drawing: undefined,
      mark: undefined,
      shippingGroup: undefined,
      shippingGroupItem: undefined,
      shipment: undefined,
      partOrder: undefined
    }

    var reset = function(){
      selected.job = undefined
      selected.drawing = undefined
      selected.mark = undefined
      selected.shippingGroup = undefined
      selected.shippingGroupItem = undefined
      selected.shipment = undefined
      selected.shipmentItem = undefined
      selected.partOrder = undefined
    }

    var selectJob = function(job){
      reset()
      selected.job = job
    }

    var selectDrawing = function(drawing){
      selected.drawing = drawing
      selected.mark = undefined
    }

    var selectMark = function(mark){
      selected.mark = mark
    }

    var selectShippingGroup = function(shippingGroup){
      selected.shippingGroup = shippingGroup
      selected.shippingGroupItem = undefined
    }

    var selectShippingGroupItem = function(shippingGroupItem){
      selected.shippingGroupItem = shippingGroupItem
    }

    var selectShipment = function(shipment){
      selected.shipment = shipment
      selected.shipmentItem = undefined
    }

    var selectShipmentItem = function(shipmentItem){
      selected.shipmentItem = shipmentItem
    }

    return {
      selected: selected,
      reset: reset,
      selectJob: selectJob,
      selectDrawing: selectDrawing,
      selectMark: selectMark,
      selectShippingGroup: selectShippingGroup,
      selectShippingGroupItem: selectShippingGroupItem,
      selectShipment: selectShipment,
      selectShipmentItem: selectShipmentItem
    }
  }
)
