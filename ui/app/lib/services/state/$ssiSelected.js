import { AbstractService } from 'utils'

export default class $ssiSelected extends AbstractService {
  /*@ngInject*/
  constructor() {
    super()
    this.init()
  }

  init() {
    this.reset()
  }

  reset() {
    this.job = undefined
  }

  get job() {
    return this._job
  }

  set job(job) {
    this.drawing = undefined
    this.partOrder = undefined
    this.shippingGroup = undefined
    this.shipment = undefined
    this.zone = undefined
    return this._job = job
  }

  get drawing() {
    return this._drawing
  }

  set drawing(drawing) {
    this.mark = undefined
    return this._drawing = drawing
  }

  get mark() {
    return this._mark
  }

  set mark(mark) {
    return this._mark = mark
  }

  get partOrder() {
    return this._partOrder
  }

  set partOrder(partOrder) {
    return this._partOrder = partOrder
  }

  get shippingGroup() {
    return this._shippingGroup
  }

  set shippingGroup(shippingGroup) {
    this.shippingGroupItem = undefined
    return this._shippingGroup = shippingGroup
  }

  get shippingGroupItem() {
    return this._shippingGroupItem
  }

  set shippingGroupItem(shippingGroupItem) {
    return this._shippingGroupItem = shippingGroupItem
  }

  get shipment() {
    return this._shipment
  }

  set shipment(shipment) {
    this.shipmentItem = undefined
    return this._shipment = shipment
  }

  get shipmentItem() {
    return this._shipmentItem
  }

  set shipmentItem(shipmentItem) {
    return this._shipmentItem = shipmentItem
  }

  get zone() {
    return this._zone
  }

  set zone(zone) {
    return this._zone = zone
  }

  get specialtyItem() {
    return this._specialtyItem
  }

  set specialtyItem(specialtyItem) {
    return this._specialtyItem = specialtyItem
  }
}
