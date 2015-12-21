package app.models

sealed trait ShippingItemStatus

object ShippingItemStatus {
  case object FAB extends ShippingItemStatus
  case object PREFAB extends ShippingItemStatus
  case object SHPD extends ShippingItemStatus
  case object RTA extends ShippingItemStatus
  case object RTS extends ShippingItemStatus
  case object MACH extends ShippingItemStatus
  case object MOO extends ShippingItemStatus
  case object NS extends ShippingItemStatus
  case object PAINT extends ShippingItemStatus
  case object SIP extends ShippingItemStatus
  case object WP extends ShippingItemStatus
  case object SAMPLE extends ShippingItemStatus
  case object MEM extends ShippingItemStatus
  case object FTS extends ShippingItemStatus
  case object VOID extends ShippingItemStatus
  case object NEXT extends ShippingItemStatus
  case object HOLD extends ShippingItemStatus
}
