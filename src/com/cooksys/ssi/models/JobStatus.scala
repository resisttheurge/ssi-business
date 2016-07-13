package com.cooksys.ssi.models

sealed trait JobStatus

object JobStatus {

  lazy val all = Set(
    ACTIVE, COMPLETED, CANCELLED
  )

  case object ACTIVE extends JobStatus

  case object COMPLETED extends JobStatus

  case object CANCELLED extends JobStatus

}
