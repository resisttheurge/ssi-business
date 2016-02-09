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

  case class Result(success: Boolean, shop: Option[Shop], before: Option[Shop], after: Option[Shop], message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toShopsRow(shop: Shop): ShopsRow =
      ShopsRow(if (shop.id.isDefined) shop.id.get else -1, shop.label)

    implicit def fromShopsRow(shopsRow: ShopsRow): Shop =
      Shop(Option(shopsRow.id), shopsRow.label)

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends RootJsonProtocol {

    implicit val `JSON ShopsRow` = jsonFormat2(ShopsRow)

    implicit val `JSON Shop` = jsonFormat2(Shop.apply)
    implicit val `JSON Shop.Index` = jsonFormat1(Index)
    implicit val `JSON Shop.Result` = jsonFormat5(Result)

  }

}