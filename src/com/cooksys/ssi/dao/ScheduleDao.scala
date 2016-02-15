package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._
import shapeless.syntax.std.tuple._

object ScheduleDao extends CrudDao[Schedule] {

  override def indexAction(implicit ec: EC) =
    for (carriers <- Schedules.result)
      yield Response[Seq[Schedule]](
        success = true,
        data = carriers.map(c => c: Schedule)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- Schedules.filter(_.id === id).result.headOption)
      yield Response[Schedule](
        success = option.isDefined,
        data = option.map(c => c: Schedule),
        message =
          if (option.isDefined) None
          else Some(s"Schedule with id=$id does not exist")
      )

  override def createAction(model: Schedule)(implicit ec: EC) =
    for {
      id <- (Schedules returning Schedules.map(_.id)) += model
      option <- Schedules.filter(_.id === id).result.headOption
    }
      yield Response[Schedule](
        success = option.isDefined,
        data = option.map(c => c: Schedule),
        message =
          if (option.isDefined) None
          else Some(s"Schedule could not be created")
      )

  override def updateAction(id: Int, model: Schedule)(implicit ec: EC) =
    for {
      before <- Schedules.filter(_.id === id).result.headOption
      rows <- Schedules.filter(_.id === id).map(r => (r.jobId, r.scheduleType, r.startDate, r.completeDate)).update((model: SchedulesRow).tail)
      after <- Schedules.filter(_.id === id).result.headOption
    }
      yield Response[Updated[Schedule]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: Schedule),
          after.map(c => c: Schedule)
        ),
        message =
          if (rows != 0) None
          else Some(s"Schedule with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- Schedules.filter(_.id === id).result.headOption
      rows <- Schedules.filter(_.id === id).delete
    }
      yield Response[Schedule](
        success = rows != 0,
        data = before.map(c => c: Schedule),
        message =
          if (rows != 0) None
          else Some(s"Schedule with id=$id does not exist")
      )
}
