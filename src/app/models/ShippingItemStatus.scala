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

  def apply(s: String) = s match {
    case "FAB" => FAB
    case "PREFAB" => PREFAB
    case "SHPD" => SHPD
    case "RTA" => RTA
    case "RTS" => RTS
    case "MACH" => MACH
    case "MOO" => MOO
    case "NS" => NS
    case "PAINT" => PAINT
    case "SIP" => SIP
    case "WP" => WP
    case "SAMPLE" => SAMPLE
    case "MEM" => MEM
    case "FTS" => FTS
    case "VOID" => VOID
    case "NEXT" => NEXT
    case "HOLD" => HOLD
  }

}
