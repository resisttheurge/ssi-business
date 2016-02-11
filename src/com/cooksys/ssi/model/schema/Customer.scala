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

  case class Result(success: Boolean, customer: Option[Customer], before: Option[Customer], after: Option[Customer], message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toCustomersRow(customer: Customer): CustomersRow =
      CustomersRow(if (customer.id.isDefined) customer.id.get else -1, customer.label)

    implicit def fromCustomersRow(customersRow: CustomersRow): Customer =
      Customer(Option(customersRow.id), customersRow.label)

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends RootJsonProtocol {

    implicit val `JSON CustomersRow` = jsonFormat2(CustomersRow)

    implicit val `JSON Customer` = jsonFormat2(Customer.apply)
    implicit val `JSON Customer.Index` = jsonFormat1(Index)
    implicit val `JSON Customer.Result` = jsonFormat5(Result)

  }

}