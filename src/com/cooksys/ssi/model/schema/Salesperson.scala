package com.cooksys.ssi.model.schema

import slick.schema.Tables.SalespeopleRow
import spray.json.DefaultJsonProtocol

case class Salesperson(id: Option[Int], label: String)

object Salesperson {

  case class Index(salespeople: Seq[Salesperson])

  type Create = Salesperson
  val Create = Salesperson

  type Update = Salesperson
  val Update = Salesperson

  case class Result(success: Boolean, carrier: Option[Salesperson], message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toShopsRow(carrier: Salesperson): SalespeopleRow =
      SalespeopleRow(if (carrier.id.isDefined) carrier.id.get else -1, carrier.label)

    implicit def fromShopsRow(carriersRow: SalespeopleRow): Salesperson =
      Salesperson(Option(carriersRow.id), carriersRow.label)

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends DefaultJsonProtocol {

    implicit val `JSON SalespeopleRow` = jsonFormat2(SalespeopleRow)

    implicit val `JSON Salesperson` = jsonFormat2(Salesperson.apply)
    implicit val `JSON Salesperson.Index` = jsonFormat1(Index)
    implicit val `JSON Salesperson.Result` = jsonFormat3(Result)

  }

}