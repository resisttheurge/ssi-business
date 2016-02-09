package com.cooksys.ssi.model.schema

import java.sql.Date
import java.util.Calendar

import slick.schema.Tables._
import slick.driver.MySQLDriver.api._

case class Job(id: Option[Int],
               identifier: Job.Identifier,
               status: String,
               description: Option[String],
               contractPrice: Option[BigDecimal],
               startDate: Option[Date],
               dueDate: Option[Date],
               completeDate: Option[Date],
               shop: Option[Shop] = None,
               salesperson: Option[Salesperson] = None,
               customer: Option[Customer] = None,
               contact: Option[Contact] = None,
               addresses: Option[Job.Addresses] = None,
               schedules: Option[Job.Schedules] = None,
               addenda: Option[Seq[Addendum]] = None)

object Job {

  case class Index(jobs: Seq[Job])

  type Create = Job
  val Create = Job

  type Update = Job
  val Update = Job

  case class Result(success: Boolean, job: Option[Job], before: Option[Job], after: Option[Job], message: Option[String])

  case class Identifier(prefix: String, year: Int, label: String)

  case class Addresses(shipping: Option[Address], invoicing: Option[Address])

  case class Schedule(startDate: Option[Date], completeDate: Option[Date])

  case class Schedules(engineering: Option[Schedule],
                       mechanical: Option[Schedule],
                       electrical: Option[Schedule],
                       shipping: Option[Schedule],
                       installation: Option[Schedule])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol with Address.Implicits with Contact.Implicits {

    implicit def toJobsRow(job: Job): JobsRow =
      JobsRow(
        id = job.id.getOrElse(-1),
        prefix = job.identifier.prefix,
        year = {
          val cal = Calendar.getInstance()
          cal.set(Calendar.YEAR, job.identifier.year)
          new Date(cal.getTime.getTime)
        },
        label = job.identifier.label,
        status = job.status,
        description = job.description,
        contractPrice = job.contractPrice,
        startDate = job.startDate,
        dueDate = job.dueDate,
        completeDate = job.completeDate,
        shopId = job.shop.flatMap(_.id),
        salespersonId = job.salesperson.flatMap(_.id),
        customerId = job.customer.flatMap(_.id),
        contactId = job.contact.flatMap(_.id)
      )

    implicit def fromJobsRow(row: JobsRow): Job =
      Job(
        id = Some(row.id),
        identifier = Identifier(
          prefix = row.prefix,
          year = {
            val cal = Calendar.getInstance()
            cal.setTime(row.year)
            cal.get(Calendar.YEAR)
          },
          label = row.label
        ),
        status = row.status,
        description = row.description,
        contractPrice = row.contractPrice,
        startDate = row.startDate,
        dueDate = row.dueDate,
        completeDate = row.completeDate
      )

    implicit def addressesFromAddressesRowAndType(rows: Seq[(String, AddressesRow)]): Addresses =
      Addresses(
        shipping = rows.find(_._1 == "SHIPPING").map(row => row._2: Address),
        invoicing = rows.find(_._1 == "INVOICING").map(row => row._2: Address)
      )

    implicit def scheduleFromSchedulesRow(row: SchedulesRow): Schedule =
      Schedule(
        row.startDate,
        row.completeDate
      )

    implicit def schedulesFromSchedulesRows(rows: Seq[SchedulesRow]): Schedules =
      Schedules(
        engineering = rows.find(_.scheduleType == "ENGINEERING").map(s => s: Schedule),
        mechanical = rows.find(_.scheduleType == "ENGINEERING").map(s => s: Schedule),
        electrical = rows.find(_.scheduleType == "ENGINEERING").map(s => s: Schedule),
        shipping = rows.find(_.scheduleType == "ENGINEERING").map(s => s: Schedule),
        installation = rows.find(_.scheduleType == "ENGINEERING").map(s => s: Schedule)
      )

    implicit class JobsQueryExtensions[C[_]](self: Query[Jobs, JobsRow, C]) {

      def byId(id: Int) = self filter (_.id === id)

    }

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol
    extends RootJsonProtocol
      with Address.JsonProtocol
      with Contact.JsonProtocol
      with Shop.JsonProtocol
      with Customer.JsonProtocol
      with Addendum.JsonProtocol
      with Salesperson.JsonProtocol {

    implicit lazy val `JSON Job.Identifier` = jsonFormat3(Identifier)
    implicit lazy val `JSON Job.Addresses` = jsonFormat2(Addresses)
    implicit lazy val `JSON Job.Schedule` = jsonFormat2(Schedule)
    implicit lazy val `JSON Job.Schedules` = jsonFormat5(Schedules)

    implicit lazy val `JSON Job` = jsonFormat15(Job.apply)

    implicit lazy val `JSON Job.Index` = jsonFormat1(Index)
    implicit lazy val `JSON Job.Result` = jsonFormat5(Result)

  }

}
