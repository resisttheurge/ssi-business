package com.cooksys.ssi.models

case class Address(id: Option[Int],
                   lines: Option[Seq[String]],
                   city: Option[String],
                   stateOrProvince: Option[String],
                   postalCode: Option[String],
                   country: Option[String])