package com.cooksys.ssi.models

sealed trait JobStatus

object JobStatus {

  lazy val all = Set(
    INACTIVE, ACTIVE, COMPLETED, CANCELLED, DELETED
  )

  case object INACTIVE extends JobStatus
  case object ACTIVE extends JobStatus
  case object COMPLETED extends JobStatus
  case object CANCELLED extends JobStatus
  case object DELETED extends JobStatus

}
