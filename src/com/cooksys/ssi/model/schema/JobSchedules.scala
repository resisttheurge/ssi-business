package com.cooksys.ssi.model.schema

import slick.schema.Tables.SchedulesRow

case class JobSchedules(engineering: Option[Schedule],
                        mechanical: Option[Schedule],
                        electrical: Option[Schedule],
                        shipping: Option[Schedule],
                        installation: Option[Schedule])

object JobSchedules {

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol with Schedule.Implicits {
    implicit def fromSetSchedulesRow(rows: Set[SchedulesRow]): JobSchedules =
      JobSchedules(
        engineering = rows.find(_.scheduleType == "ENGINEERING").map(s => s: Schedule),
        mechanical = rows.find(_.scheduleType == "MECHANICAL").map(s => s: Schedule),
        electrical = rows.find(_.scheduleType == "ELECTRICAL").map(s => s: Schedule),
        shipping = rows.find(_.scheduleType == "SHIPPING").map(s => s: Schedule),
        installation = rows.find(_.scheduleType == "INSTALLATION").map(s => s: Schedule)
      )


  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends RootJsonProtocol with Schedule.JsonProtocol {
    implicit val `JSON JobSchedules` = jsonFormat5(JobSchedules.apply)
  }
}
