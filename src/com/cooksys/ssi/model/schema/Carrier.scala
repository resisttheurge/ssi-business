package com.cooksys.ssi.model.schema

import slick.schema.Tables.CarriersRow
import spray.json.DefaultJsonProtocol

case class Carrier(id: Option[Int], label: String)

object Carrier {

  case class Index(carriers: Seq[Carrier])

  type Create = Carrier
  val Create = Carrier

  type Update = Carrier
  val Update = Carrier

  case class Result(success: Boolean, carrier: Option[Carrier], before: Option[Carrier], after: Option[Carrier], message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toCarriersRow(carrier: Carrier): CarriersRow =
      CarriersRow(if (carrier.id.isDefined) carrier.id.get else -1, carrier.label)

    implicit def fromCarriersRow(carriersRow: CarriersRow): Carrier =
      Carrier(Option(carriersRow.id), carriersRow.label)

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends RootJsonProtocol {

    implicit val `JSON CarriersRow` = jsonFormat2(CarriersRow)

    implicit val `JSON Carrier` = jsonFormat2(Carrier.apply)
    implicit val `JSON Carrier.Index` = jsonFormat1(Index)
    implicit val `JSON Carrier.Result` = jsonFormat5(Result)

  }

}
