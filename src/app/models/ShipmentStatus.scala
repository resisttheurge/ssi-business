package app.models

sealed trait ShipmentStatus

object ShipmentStatus {
  case object ACTIVE extends ShipmentStatus
  case object POSTED extends ShipmentStatus
  case object COMPLETED extends ShipmentStatus
  case object CANCELLED extends ShipmentStatus
  case object DELETED extends ShipmentStatus
}
