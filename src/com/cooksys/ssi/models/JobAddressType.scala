package com.cooksys.ssi.models

sealed trait JobAddressType

object JobAddressType {

  lazy val all = Set(
    SHIPPING, INVOICING
  )

  case object SHIPPING extends JobAddressType

  case object INVOICING extends JobAddressType

}