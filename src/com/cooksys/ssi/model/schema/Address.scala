package com.cooksys.ssi.model.schema

import slick.schema.Tables.AddressesRow
import spray.json.DefaultJsonProtocol

case class Address(id: Option[Int],
                    lines: Option[Seq[String]],
                   city: Option[String],
                   stateOrProvince: Option[String],
                   postalCode: Option[String],
                   country: Option[String])

object Address {

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toAddressesRow(address: Address): AddressesRow =
      AddressesRow(
        address.id.getOrElse(-1),
        address.lines.map(_.mkString(";")),
        address.city,
        address.stateOrProvince,
        address.postalCode,
        address.country
      )

    implicit def fromAddressesRow(addressesRow: AddressesRow): Address =
      Address(
        Some(addressesRow.id),
        addressesRow.lines.map(_.split(';')),
        addressesRow.city,
        addressesRow.stateOrProvince,
        addressesRow.postalCode,
        addressesRow.country
      )

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends RootJsonProtocol {

    implicit val `JSON Address` = jsonFormat6(Address.apply)

  }

}