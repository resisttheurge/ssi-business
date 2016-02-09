package com.cooksys.ssi.model.schema

import java.sql.{Timestamp, Date}
import java.util.Calendar

import slick.schema.Tables._
import slick.driver.MySQLDriver.api._

case class Addendum(id: Option[Int],
                    jobId: Int,
                    label: String,
                    description: String,
                    contractPrice: Option[BigDecimal],
                    salesperson: Option[Salesperson] = None,
                    contact: Option[Contact] = None,
                    created: Option[Timestamp])

object Addendum {

  trait Implicits extends JsonProtocol {

    implicit def fromAddendaRow(row: AddendaRow): Addendum =
      Addendum(
        id = Some(row.id),
        jobId = row.jobId,
        label = row.label,
        description = row.description,
        contractPrice = row.contractPrice,
        created = Some(row.created)
      )

    implicit def toAddendaRow(addendum: Addendum): AddendaRow =
      AddendaRow(
        id = addendum.id.getOrElse(-1),
        jobId = addendum.jobId,
        label = addendum.label,
        description = addendum.description,
        contractPrice = addendum.contractPrice,
        salespersonId = addendum.salesperson.flatMap(_.id),
        contactId = addendum.contact.flatMap(_.id),
        created = addendum.created.getOrElse(new Timestamp(Calendar.getInstance().getTimeInMillis))
      )

    implicit class AddendaQueryExtensions[C[_]](self: Query[Addenda, AddendaRow, C]) {
      def withDependents =
        (self joinLeft Salespeople on (_.salespersonId === _.id) joinLeft Contacts on (_._1.contactId === _.id))
          .map {
            case ((addendum, salesperson), contact) => (addendum, salesperson, contact)
          }
    }

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends RootJsonProtocol with Salesperson.JsonProtocol with Contact.JsonProtocol {

    implicit val `JSON Addendum` = jsonFormat8(Addendum.apply)

  }

}