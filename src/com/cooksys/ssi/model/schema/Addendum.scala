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

  case class Index(addenda: Seq[Addendum])

  type Create = Addendum
  val Create = Addendum

  type Update = Addendum
  val Update = Addendum

  case class Result(success: Boolean,
                    addendum: Option[Addendum],
                    before: Option[Addendum],
                    after: Option[Addendum],
                    message: Option[String])

  object Implicits extends Implicits

  trait Implicits
    extends JsonProtocol
      with Salesperson.Implicits
      with Contact.Implicits {

    implicit def fromAddendaRow(row: AddendaRow): Addendum =
      Addendum(
        id = Some(row.id),
        jobId = row.jobId,
        label = row.label,
        description = row.description,
        contractPrice = row.contractPrice,
        created = Some(row.created)
      )

    implicit def fromAddendaRowWithDependents(row: (AddendaRow, Option[SalespeopleRow], Option[ContactsRow])): Addendum =
      Addendum(
        id = Some(row._1.id),
        jobId = row._1.jobId,
        label = row._1.label,
        description = row._1.description,
        contractPrice = row._1.contractPrice,
        created = Some(row._1.created),
        salesperson = row._2.map(s => s: Salesperson),
        contact = row._3.map(c => c: Contact)
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
      def byId(id: Rep[Int]) = self filter (_.id === id)

      def byJobId(id: Rep[Int]) = self filter (_.jobId === id)

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