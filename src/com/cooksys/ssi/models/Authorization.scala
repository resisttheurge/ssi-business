package com.cooksys.ssi.models

case class Authorization(username: String,
                         roles: Option[Seq[UserRoleType]])
