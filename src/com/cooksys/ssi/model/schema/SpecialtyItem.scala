package com.cooksys.ssi.model.schema

import slick.schema.Tables.SpecialtyItemsRow
import spray.json.DefaultJsonProtocol

case class SpecialtyItem(id: Option[Int], label: String)

object SpecialtyItem {

  case class Index(specialtyItems: Seq[SpecialtyItem])

  type Create = SpecialtyItem
  val Create = SpecialtyItem

  type Update = SpecialtyItem
  val Update = SpecialtyItem

  case class Result(success: Boolean, carrier: Option[SpecialtyItem], message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toShopsRow(carrier: SpecialtyItem): SpecialtyItemsRow =
      SpecialtyItemsRow(if (carrier.id.isDefined) carrier.id.get else -1, carrier.label)

    implicit def fromShopsRow(carriersRow: SpecialtyItemsRow): SpecialtyItem =
      SpecialtyItem(Option(carriersRow.id), carriersRow.label)

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends DefaultJsonProtocol {

    implicit val `JSON SpecialtyItemsRow` = jsonFormat2(SpecialtyItemsRow)

    implicit val `JSON SpecialtyItem` = jsonFormat2(SpecialtyItem.apply)
    implicit val `JSON SpecialtyItem.Index` = jsonFormat1(Index)
    implicit val `JSON SpecialtyItem.Result` = jsonFormat3(Result)

  }

}