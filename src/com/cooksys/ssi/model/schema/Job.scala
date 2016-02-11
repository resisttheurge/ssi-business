package com.cooksys.ssi.model.schema

import java.sql.Date
import java.util.Calendar

import slick.schema.Tables
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
               contact: Option[Contact] = None)

object Job {

  case class Index(jobs: Seq[Job])

  type Create = Job
  val Create = Job

  type Update = Job
  val Update = Job

  case class Result(success: Boolean, job: Option[Job], before: Option[Job], after: Option[Job], message: Option[String])

  case class Identifier(prefix: String, year: Int, label: String)

  type JobsRowWithDependents =
  (JobsRow, Option[ShopsRow], Option[SalespeopleRow], Option[CustomersRow], Option[ContactsRow])

  object Implicits extends Implicits

  trait Implicits
    extends JsonProtocol
      with Shop.Implicits
      with Salesperson.Implicits
      with Customer.Implicits
      with Contact.Implicits
      with Addendum.Implicits {

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

    implicit def fromJobsRowWithDependents(row: JobsRowWithDependents): Job =
      row match {
        case (job, shop, salesperson, customer, contact) =>
          Job(
            id = Some(job.id),
            identifier = Identifier(
              prefix = job.prefix,
              year = {
                val cal = Calendar.getInstance()
                cal.setTime(job.year)
                cal.get(Calendar.YEAR)
              },
              label = job.label
            ),
            status = job.status,
            description = job.description,
            contractPrice = job.contractPrice,
            startDate = job.startDate,
            dueDate = job.dueDate,
            completeDate = job.completeDate,
            shop = shop.map(s => s: Shop),
            salesperson = salesperson.map(s => s: Salesperson),
            customer = customer.map(c => c: Customer),
            contact = contact.map(c => c: Contact)
          )
      }

    implicit class JobsQueryExtensions[C[_]](self: Query[Jobs, JobsRow, C]) {

      def byId(id: Rep[Int]) = self filter (_.id === id)

      def withDependents =
        for {
          ((((job, shop), salesperson), customer), contact) <- {
            self
              .joinLeft(Shops).on(_.shopId === _.id)
              .joinLeft(Salespeople).on(_._1.salespersonId === _.id)
              .joinLeft(Customers).on(_._1._1.customerId === _.id)
              .joinLeft(Contacts).on(_._1._1._1.contactId === _.id)
          }
        } yield
          (job, shop, salesperson, customer, contact)

    }

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol
    extends RootJsonProtocol
      with Contact.JsonProtocol
      with Shop.JsonProtocol
      with Customer.JsonProtocol
      with Addendum.JsonProtocol
      with Salesperson.JsonProtocol {

    implicit lazy val `JSON Job.Identifier` = jsonFormat3(Identifier)
    implicit lazy val `JSON Job` = jsonFormat12(Job.apply)

    implicit lazy val `JSON Job.Index` = jsonFormat1(Index)
    implicit lazy val `JSON Job.Result` = jsonFormat5(Result)

  }

}
