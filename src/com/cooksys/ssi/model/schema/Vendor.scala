package com.cooksys.ssi.model.schema

import slick.schema.Tables.VendorsRow
import spray.json.DefaultJsonProtocol

case class Vendor(id: Option[Int], label: String)

object Vendor {

  case class Index(vendors: Seq[Vendor])

  type Create = Vendor
  val Create = Vendor

  type Update = Vendor
  val Update = Vendor

  case class Result(success: Boolean, carrier: Option[Vendor], message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toVendorsRow(carrier: Vendor): VendorsRow =
      VendorsRow(if (carrier.id.isDefined) carrier.id.get else -1, carrier.label)

    implicit def fromVendorsRow(carriersRow: VendorsRow): Vendor =
      Vendor(Option(carriersRow.id), carriersRow.label)

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends DefaultJsonProtocol {

    implicit val `JSON VendorsRow` = jsonFormat2(VendorsRow)

    implicit val `JSON Vendor` = jsonFormat2(Vendor.apply)
    implicit val `JSON Vendor.Index` = jsonFormat1(Index)
    implicit val `JSON Vendor.Result` = jsonFormat3(Result)

  }

}