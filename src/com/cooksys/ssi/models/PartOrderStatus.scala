package com.cooksys.ssi.models

sealed trait PartOrderStatus

object PartOrderStatus {

  val all = Set(
    ACTIVE, COMPLETED, CANCELLED, DELETED
  )

  case object ACTIVE extends PartOrderStatus

  case object COMPLETED extends PartOrderStatus

  case object CANCELLED extends PartOrderStatus

  case object DELETED extends PartOrderStatus

}
