package com.cooksys.ssi.models

sealed trait UserRoleType
object UserRoleType {

  val all = Set(
    ADMIN, EMPLOYEE
  )

  case object ADMIN extends UserRoleType
  case object EMPLOYEE extends UserRoleType

}
