package app.models

case class Address(pk: Option[Int],
                   lines: String,
                   city: String,
                   stateOrProvince: String,
                   postalCode: String,
                   country: String)
