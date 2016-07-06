package com.cooksys.ssi.models

sealed trait DrawingType

object DrawingType {

  val all = Set(
    DETAIL, LAYOUT, VOID
  )

  case object DETAIL extends DrawingType

  case object LAYOUT extends DrawingType

  case object VOID extends DrawingType

}