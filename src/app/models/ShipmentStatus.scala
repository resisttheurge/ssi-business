package app.models

sealed trait ShipmentStatus

object ShipmentStatus {
  case object ACTIVE extends ShipmentStatus
  case object POSTED extends ShipmentStatus
  case object COMPLETED extends ShipmentStatus
  case object CANCELLED extends ShipmentStatus
  case object DELETED extends ShipmentStatus

  def apply(s: String) = s match {
    case "ACTIVE" => ACTIVE
    case "POSTED" => POSTED
    case "COMPLETED" => COMPLETED
    case "CANCELLED" => CANCELLED
    case "DELETED" => DELETED
  }
}
