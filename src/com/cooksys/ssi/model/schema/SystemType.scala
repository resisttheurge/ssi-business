package com.cooksys.ssi.model.schema

import slick.schema.Tables.SystemTypesRow
import spray.json.DefaultJsonProtocol

case class SystemType(id: Option[Int], label: String)

object SystemType {

  case class Index(systemTypes: Seq[SystemType])

  type Create = SystemType
  val Create = SystemType

  type Update = SystemType
  val Update = SystemType

  case class Result(success: Boolean, carrier: Option[SystemType], message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toShopsRow(carrier: SystemType): SystemTypesRow =
      SystemTypesRow(if (carrier.id.isDefined) carrier.id.get else -1, carrier.label)

    implicit def fromShopsRow(carriersRow: SystemTypesRow): SystemType =
      SystemType(Option(carriersRow.id), carriersRow.label)

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends DefaultJsonProtocol {

    implicit val `JSON SystemTypesRow` = jsonFormat2(SystemTypesRow)

    implicit val `JSON SystemType` = jsonFormat2(SystemType.apply)
    implicit val `JSON SystemType.Index` = jsonFormat1(Index)
    implicit val `JSON SystemType.Result` = jsonFormat3(Result)

  }

}