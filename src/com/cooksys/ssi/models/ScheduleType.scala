package com.cooksys.ssi.models

sealed trait ScheduleType

object ScheduleType {

  val all = Set(
    ENGINEERING, MECHANICAL, ELECTRICAL, SHIPPING, INSTALLATION
  )

  case object ENGINEERING extends ScheduleType

  case object MECHANICAL extends ScheduleType

  case object ELECTRICAL extends ScheduleType

  case object SHIPPING extends ScheduleType

  case object INSTALLATION extends ScheduleType

}