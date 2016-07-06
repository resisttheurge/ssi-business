package com.cooksys.ssi.models

sealed trait TagType

object TagType {

  val all = Set(
    S, W
  )

  case object S extends TagType

  case object W extends TagType

}