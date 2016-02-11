package com.cooksys.ssi.model.schema

import slick.schema.Tables._
import slick.driver.MySQLDriver.api._

case class Address(id: Option[Int],
                   lines: Option[Seq[String]],
                   city: Option[String],
                   stateOrProvince: Option[String],
                   postalCode: Option[String],
                   country: Option[String])

object Address {

  type Create = Address
  val Create = Address

  type Update = Address
  val Update = Address

  case class Result(success: Boolean,
                    address: Option[Address],
                    before: Option[Address],
                    after: Option[Address],
                    message: Option[String])

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
        addressesRow.lines.map(_.split(";|\\n")),
        addressesRow.city,
        addressesRow.stateOrProvince,
        addressesRow.postalCode,
        addressesRow.country
      )

    implicit class AddressesQueryExtensions[C[_]](self: Query[Addresses, AddressesRow, C]) {

      def byId(id: Rep[Int]) = self filter (_.id === id)

    }

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends RootJsonProtocol {

    implicit val `JSON Address` = jsonFormat6(Address.apply)

  }

}