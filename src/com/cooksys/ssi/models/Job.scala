package com.cooksys.ssi.models

import java.sql.Date
import java.util.Calendar

import slick.schema.Tables
import slick.schema.Tables._
import slick.driver.MySQLDriver.api._

case class Job(id: Option[Int],
               identifier: JobIdentifier,
               status: JobStatus,
               description: Option[String],
               contractPrice: Option[BigDecimal],
               startDate: Option[Date],
               dueDate: Option[Date],
               completeDate: Option[Date],
               shop: Option[Shop] = None,
               salesperson: Option[Salesperson] = None,
               customer: Option[Customer] = None,
               invoicingCustomer: Option[Customer] = None,
               contact: Option[Contact] = None,
               addresses: Option[JobAddresses] = None)