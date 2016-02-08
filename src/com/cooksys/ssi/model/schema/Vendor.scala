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

  case class Result(success: Boolean, vendor: Option[Vendor], before: Option[Vendor], after: Option[Vendor], message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toVendorsRow(vendor: Vendor): VendorsRow =
      VendorsRow(if (vendor.id.isDefined) vendor.id.get else -1, vendor.label)

    implicit def fromVendorsRow(vendorsRow: VendorsRow): Vendor =
      Vendor(Option(vendorsRow.id), vendorsRow.label)

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends DefaultJsonProtocol {

    implicit val `JSON VendorsRow` = jsonFormat2(VendorsRow)

    implicit val `JSON Vendor` = jsonFormat2(Vendor.apply)
    implicit val `JSON Vendor.Index` = jsonFormat1(Index)
    implicit val `JSON Vendor.Result` = jsonFormat5(Result)

  }

}