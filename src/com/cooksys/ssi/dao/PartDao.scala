package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

object PartDao extends CrudDao[Part] {

  override def indexAction(implicit ec: EC) =
    for (carriers <- Parts.result)
      yield Response[Seq[Part]](
        success = true,
        data = carriers.map(c => c: Part)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- Parts.filter(_.id === id).result.headOption)
      yield Response[Part](
        success = option.isDefined,
        data = option.map(c => c: Part),
        message =
          if (option.isDefined) None
          else Some(s"Part with id=$id does not exist")
      )

  override def createAction(model: Part)(implicit ec: EC) =
    for {
      id <- (Parts returning Parts.map(_.id)) += model
      option <- Parts.filter(_.id === id).result.headOption
    }
      yield Response[Part](
        success = option.isDefined,
        data = option.map(c => c: Part),
        message =
          if (option.isDefined) None
          else Some(s"Part could not be created")
      )

  override def updateAction(id: Int, model: Part)(implicit ec: EC) =
    for {
      before <- Parts.filter(_.id === id).result.headOption
      rows <- Parts.filter(_.id === id).map(r => (r.`type`, r.number, r.description)).update((model.partType, model.number, model.description))
      after <- Parts.filter(_.id === id).result.headOption
    }
      yield Response[Updated[Part]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: Part),
          after.map(c => c: Part)
        ),
        message =
          if (rows != 0) None
          else Some(s"Part with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- Parts.filter(_.id === id).result.headOption
      rows <- Parts.filter(_.id === id).delete
    }
      yield Response[Part](
        success = rows != 0,
        data = before.map(c => c: Part),
        message =
          if (rows != 0) None
          else Some(s"Part with id=$id does not exist")
      )
}
