package com.cooksys.ssi.model.schema

import slick.schema.Tables._
import slick.driver.MySQLDriver.api._

case class AllJobAddresses(shipping: Option[Address], invoicing: Option[Address]) {
  def types =
    (if (shipping.isDefined) Set("SHIPPING") else Set.empty) ++
      (if (invoicing.isDefined) Set("INVOICING") else Set.empty)
  def apply(addressType: String): Option[Address] =
    addressType match {
      case "SHIPPING" => shipping
      case "INVOICING" => invoicing
      case _ => None
    }
}

object AllJobAddresses {

  type Create = AllJobAddresses
  val Create = AllJobAddresses

  type Update = AllJobAddresses
  val Update = AllJobAddresses

  case class Result(success: Boolean, addresses: Option[AllJobAddresses], before: Option[AllJobAddresses], after: Option[AllJobAddresses], message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol with Address.Implicits {
    implicit def addressesFromAddressesRowAndType(rows: Set[(JobAddressesRow, AddressesRow)]): AllJobAddresses =
      AllJobAddresses(
        shipping = rows.find(_._1.addressType == "SHIPPING").map(_._2: Address),
        invoicing = rows.find(_._1.addressType == "INVOICING").map(_._2: Address)
      )

    implicit class JobAddressesQueryExtensions[C[_]](self: Query[JobAddresses, JobAddressesRow, C]) {

      def byJobId(id: Rep[Int]) = self filter (_.jobId === id)

    }

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends RootJsonProtocol with Address.JsonProtocol {
    implicit lazy val `JSON AllJobAddresses` = jsonFormat2(AllJobAddresses.apply)
    implicit lazy val `JSON AllJobAddresses.Result` = jsonFormat5(Result)
  }

}