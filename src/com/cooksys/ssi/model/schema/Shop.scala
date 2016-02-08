package com.cooksys.ssi.model.schema

import slick.schema.Tables.ShopsRow
import spray.json.DefaultJsonProtocol

case class Shop(id: Option[Int], label: String)

object Shop {

  case class Index(shops: Seq[Shop])

  type Create = Shop
  val Create = Shop

  type Update = Shop
  val Update = Shop

  case class Result(success: Boolean, carrier: Option[Shop], message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toShopsRow(carrier: Shop): ShopsRow =
      ShopsRow(if (carrier.id.isDefined) carrier.id.get else -1, carrier.label)

    implicit def fromShopsRow(carriersRow: ShopsRow): Shop =
      Shop(Option(carriersRow.id), carriersRow.label)

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends DefaultJsonProtocol {

    implicit val `JSON ShopsRow` = jsonFormat2(ShopsRow)

    implicit val `JSON Shop` = jsonFormat2(Shop.apply)
    implicit val `JSON Shop.Index` = jsonFormat1(Index)
    implicit val `JSON Shop.Result` = jsonFormat3(Result)

  }

}