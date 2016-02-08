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

  case class Result(success: Boolean, systemType: Option[SystemType], before: Option[SystemType], after: Option[SystemType], message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toSystemTypesRow(systemType: SystemType): SystemTypesRow =
      SystemTypesRow(if (systemType.id.isDefined) systemType.id.get else -1, systemType.label)

    implicit def fromSystemTypesRow(systemTypesRow: SystemTypesRow): SystemType =
      SystemType(Option(systemTypesRow.id), systemTypesRow.label)

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends DefaultJsonProtocol {

    implicit val `JSON SystemTypesRow` = jsonFormat2(SystemTypesRow)

    implicit val `JSON SystemType` = jsonFormat2(SystemType.apply)
    implicit val `JSON SystemType.Index` = jsonFormat1(Index)
    implicit val `JSON SystemType.Result` = jsonFormat5(Result)

  }

}