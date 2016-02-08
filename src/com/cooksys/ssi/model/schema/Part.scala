package com.cooksys.ssi.model.schema

import slick.schema.Tables.PartsRow
import spray.json.DefaultJsonProtocol

case class Part(id: Option[Int], partType: String, number: Option[String], description: Option[String])

object Part {

  case class Index(parts: Seq[Part])

  type Create = Part
  val Create = Part

  type Update = Part
  val Update = Part

  case class Result(success: Boolean, part: Option[Part], before: Option[Part], after: Option[Part], message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toPartsRow(part: Part): PartsRow =
      PartsRow(if (part.id.isDefined) part.id.get else -1, part.partType)

    implicit def fromPartsRow(partsRow: PartsRow): Part =
      Part(Option(partsRow.id), partsRow.`type`, partsRow.number, partsRow.description)

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends DefaultJsonProtocol {

    implicit val `JSON PartsRow` = jsonFormat4(PartsRow)

    implicit val `JSON Part` = jsonFormat4(Part.apply)
    implicit val `JSON Part.Index` = jsonFormat1(Index)
    implicit val `JSON Part.Result` = jsonFormat5(Result)

  }

}