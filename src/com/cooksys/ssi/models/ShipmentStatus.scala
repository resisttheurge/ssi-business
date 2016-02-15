package com.cooksys.ssi.models

sealed trait ShipmentStatus
object ShipmentStatus {

  val all = Set(
    ACTIVE, POSTED, COMPLETED, CANCELLED, DELETED
  )

  case object ACTIVE extends ShipmentStatus
  case object POSTED extends ShipmentStatus
  case object COMPLETED extends ShipmentStatus
  case object CANCELLED extends ShipmentStatus
  case object DELETED extends ShipmentStatus

}
