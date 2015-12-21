package app.models


sealed trait PartOrderStatus

object PartOrderStatus {
  case object ACTIVE extends PartOrderStatus
  case object COMPLETED extends PartOrderStatus
  case object CANCELLED extends PartOrderStatus
  case object DELETED extends PartOrderStatus
}
