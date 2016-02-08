package com.cooksys.ssi.model.schema

import slick.schema.Tables.CustomersRow
import spray.json.DefaultJsonProtocol

case class Customer(id: Option[Int], label: String)

object Customer {

  case class Index(customers: Seq[Customer])

  type Create = Customer
  val Create = Customer

  type Update = Customer
  val Update = Customer

  case class Result(success: Boolean, carrier: Option[Customer], message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toCustomersRow(carrier: Customer): CustomersRow =
      CustomersRow(if (carrier.id.isDefined) carrier.id.get else -1, carrier.label)

    implicit def fromCustomersRow(carriersRow: CustomersRow): Customer =
      Customer(Option(carriersRow.id), carriersRow.label)

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends DefaultJsonProtocol {

    implicit val `JSON CustomersRow` = jsonFormat2(CustomersRow)

    implicit val `JSON Customer` = jsonFormat2(Customer.apply)
    implicit val `JSON Customer.Index` = jsonFormat1(Index)
    implicit val `JSON Customer.Result` = jsonFormat3(Result)

  }

}