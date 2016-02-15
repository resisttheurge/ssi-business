package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

object MarkDao extends CrudDao[Mark] {

  override def indexAction(implicit ec: EC) =
    for (carriers <- Marks.withDependents.result)
      yield Response[Seq[Mark]](
        success = true,
        data = carriers.map(c => c: Mark)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- Marks.filter(_.id === id).withDependents.result.headOption)
      yield Response[Mark](
        success = option.isDefined,
        data = option.map(c => c: Mark),
        message =
          if (option.isDefined) None
          else Some(s"Mark with id=$id does not exist")
      )

  override def createAction(model: Mark)(implicit ec: EC) =
    for {
      id <- (Marks returning Marks.map(_.id)) += model
      option <- Marks.filter(_.id === id).withDependents.result.headOption
    }
      yield Response[Mark](
        success = option.isDefined,
        data = option.map(c => c: Mark),
        message =
          if (option.isDefined) None
          else Some(s"Mark could not be created")
      )

  override def updateAction(id: Int, model: Mark)(implicit ec: EC) =
    for {
      before <- Marks.filter(_.id === id).withDependents.result.headOption
      rows <- Marks.filter(_.id === id).map(_.label).update(model.label)
      after <- Marks.filter(_.id === id).withDependents.result.headOption
    }
      yield Response[Updated[Mark]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: Mark),
          after.map(c => c: Mark)
        ),
        message =
          if (rows != 0) None
          else Some(s"Mark with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- Marks.filter(_.id === id).withDependents.result.headOption
      rows <- Marks.filter(_.id === id).delete
    }
      yield Response[Mark](
        success = rows != 0,
        data = before.map(c => c: Mark),
        message =
          if (rows != 0) None
          else Some(s"Mark with id=$id does not exist")
      )
}
