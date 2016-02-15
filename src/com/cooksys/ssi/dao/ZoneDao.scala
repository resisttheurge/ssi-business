package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

object ZoneDao extends CrudDao[Zone] {

  val indexByJobIdQuery =
    Compiled((jobId: Rep[Int]) => Zones.filter(_.jobId === jobId))

  def indexByJobId(jobId: Int)(implicit db: DB, ec: EC) =
    run(
      for {
        zones <- indexByJobIdQuery(jobId).result
      } yield {
        Response[Seq[Zone]](
          success = true,
          data = zones.map(z => z: Zone)
        )
      }
    )

  override def indexAction(implicit ec: EC) =
    for (carriers <- Zones.result)
      yield Response[Seq[Zone]](
        success = true,
        data = carriers.map(c => c: Zone)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- Zones.filter(_.id === id).result.headOption)
      yield Response[Zone](
        success = option.isDefined,
        data = option.map(c => c: Zone),
        message =
          if (option.isDefined) None
          else Some(s"Zone with id=$id does not exist")
      )

  override def createAction(model: Zone)(implicit ec: EC) =
    for {
      id <- (Zones returning Zones.map(_.id)) += model
      option <- Zones.filter(_.id === id).result.headOption
    }
      yield Response[Zone](
        success = option.isDefined,
        data = option.map(c => c: Zone),
        message =
          if (option.isDefined) None
          else Some(s"Zone could not be created")
      )

  override def updateAction(id: Int, model: Zone)(implicit ec: EC) =
    for {
      before <- Zones.filter(_.id === id).result.headOption
      rows <- Zones.filter(_.id === id).map(r => (r.number, r.fieldDate)).update((model.number, model.fieldDate))
      after <- Zones.filter(_.id === id).result.headOption
    }
      yield Response[Updated[Zone]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: Zone),
          after.map(c => c: Zone)
        ),
        message =
          if (rows != 0) None
          else Some(s"Zone with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- Zones.filter(_.id === id).result.headOption
      rows <- Zones.filter(_.id === id).delete
    }
      yield Response[Zone](
        success = rows != 0,
        data = before.map(c => c: Zone),
        message =
          if (rows != 0) None
          else Some(s"Zone with id=$id does not exist")
      )
}
