package com.cooksys.ssi.models

sealed trait PartType

object PartType {

  val all = Set(
    MECH, ELEC
  )

  case object MECH extends PartType

  case object ELEC extends PartType

}