package com.cooksys.ssi.model.schema

import slick.schema.Tables.ManufacturersRow
import spray.json.DefaultJsonProtocol

case class Manufacturer(id: Option[Int], label: String)

object Manufacturer {

  case class Index(manufacturers: Seq[Manufacturer])

  type Create = Manufacturer
  val Create = Manufacturer

  type Update = Manufacturer
  val Update = Manufacturer

  case class Result(success: Boolean, carrier: Option[Manufacturer], message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toManufacturersRow(carrier: Manufacturer): ManufacturersRow =
      ManufacturersRow(if (carrier.id.isDefined) carrier.id.get else -1, carrier.label)

    implicit def fromManufacturersRow(carriersRow: ManufacturersRow): Manufacturer =
      Manufacturer(Option(carriersRow.id), carriersRow.label)

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends DefaultJsonProtocol {

    implicit val `JSON ManufacturersRow` = jsonFormat2(ManufacturersRow)

    implicit val `JSON Manufacturer` = jsonFormat2(Manufacturer.apply)
    implicit val `JSON Manufacturer.Index` = jsonFormat1(Index)
    implicit val `JSON Manufacturer.Result` = jsonFormat3(Result)

  }

}