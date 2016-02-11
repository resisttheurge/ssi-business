package com.cooksys.ssi.model.schema

import java.sql.Date

import slick.schema.Tables._
import slick.driver.MySQLDriver.api._

case class Schedule(id: Option[Int], scheduleType: Option[String], startDate: Option[Date], completeDate: Option[Date])

object Schedule {

  type Create  = Schedule
  val Create = Schedule

  type Update = Schedule
  val Update = Schedule

  case class Result(success: Boolean,
                    schedule: Option[Schedule],
                    before: Option[Schedule],
                    after: Option[Schedule],
                    message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {
    implicit def fromSchedulesRow(row: SchedulesRow): Schedule =
      Schedule(Some(row.id), Some(row.scheduleType), row.startDate, row.completeDate)

    implicit class SchedulesQueryExtensions[C[_]](self: Query[Schedules, SchedulesRow, C]) {
      def byJobId(id: Rep[Int]) = self filter (_.jobId === id)
    }
  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends RootJsonProtocol {

    implicit val `JSON Schedule` = jsonFormat4(Schedule.apply)

  }

}