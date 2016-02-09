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

  case class Result(success: Boolean, specialtyItem: Option[SpecialtyItem], before: Option[SpecialtyItem], after: Option[SpecialtyItem], message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toSpecialtyItemsRow(specialtyItem: SpecialtyItem): SpecialtyItemsRow =
      SpecialtyItemsRow(if (specialtyItem.id.isDefined) specialtyItem.id.get else -1, specialtyItem.label)

    implicit def fromSpecialtyItemsRow(specialtyItemsRow: SpecialtyItemsRow): SpecialtyItem =
      SpecialtyItem(Option(specialtyItemsRow.id), specialtyItemsRow.label)

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends RootJsonProtocol {

    implicit val `JSON SpecialtyItemsRow` = jsonFormat2(SpecialtyItemsRow)

    implicit val `JSON SpecialtyItem` = jsonFormat2(SpecialtyItem.apply)
    implicit val `JSON SpecialtyItem.Index` = jsonFormat1(Index)
    implicit val `JSON SpecialtyItem.Result` = jsonFormat5(Result)

  }

}