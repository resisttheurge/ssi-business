package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

object JobDao extends CrudDao[Job] {

  val indexQuery =
    Compiled(Jobs.withDependents)

  val readQuery =
    Compiled((id: Rep[Int]) => Jobs.filter(_.id === id).withDependents)

  def indexAction(implicit ec: EC) =
    for (jobs <- indexQuery.result)
      yield {
        Response[Seq[Job]](
          success = true,
          data = jobs.map(j => j: Job)
        )
      }


  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- readQuery(id).result.headOption)
      yield {
        Response[Job](
          success = option.isDefined,
          data = option.map(j => j: Job),
          message =
            if (option.isDefined) None
            else Some(s"Job with id=$id does not exist")
        )
      }

  override def createAction(model: Job)(implicit ec: EC) =
    for {
      id <- (Jobs returning Jobs.map(_.id)) += model
      option <- readQuery(id).result.headOption
    }
      yield {
        Response[Job](
          success = option.isDefined,
          data = option.map(j => j: Job),
          message =
            if (option.isDefined) None
            else Some(s"Job could not be created")
        )
      }

  override def updateAction(id: Int, model: Job)(implicit ec: EC) =
    for {
      before <- readQuery(id).result.headOption
      rows <- Jobs.byId(id).update(model)
      after <- readQuery(id).result.headOption
    }
      yield Response[Updated[Job]](
        success = rows != 0,
        data = Updated(
          before.map(j => j: Job),
          after.map(j => j: Job)
        ),
        message =
          if (rows != 0) None
          else Some(s"Job with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- readQuery(id).result.headOption
      rows <- Jobs.byId(id).delete
    }
      yield Response[Job](
        success = rows != 0,
        data = before.map(j => j: Job),
        message =
          if (rows != 0) None
          else Some(s"Job with id=$id does not exist")
      )
}
