package app.models


sealed trait PartOrderStatus

object PartOrderStatus {
  case object ACTIVE extends PartOrderStatus
  case object COMPLETED extends PartOrderStatus
  case object CANCELLED extends PartOrderStatus
  case object DELETED extends PartOrderStatus

  def apply(s: String) = s match {
    case "ACTIVE" => ACTIVE
    case "COMPLETED" => COMPLETED
    case "CANCELLED" => CANCELLED
    case "DELETED" => DELETED
  }

}
