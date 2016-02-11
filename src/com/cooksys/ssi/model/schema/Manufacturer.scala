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

  case class Result(success: Boolean, manufacturer: Option[Manufacturer], before: Option[Manufacturer], after: Option[Manufacturer], message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toManufacturersRow(manufacturer: Manufacturer): ManufacturersRow =
      ManufacturersRow(if (manufacturer.id.isDefined) manufacturer.id.get else -1, manufacturer.label)

    implicit def fromManufacturersRow(manufacturersRow: ManufacturersRow): Manufacturer =
      Manufacturer(Option(manufacturersRow.id), manufacturersRow.label)

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends RootJsonProtocol {

    implicit val `JSON ManufacturersRow` = jsonFormat2(ManufacturersRow)

    implicit val `JSON Manufacturer` = jsonFormat2(Manufacturer.apply)
    implicit val `JSON Manufacturer.Index` = jsonFormat1(Index)
    implicit val `JSON Manufacturer.Result` = jsonFormat5(Result)

  }

}