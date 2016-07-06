package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

object SpecialtyItemDao extends CrudDao[SpecialtyItem] {

  override def indexAction(implicit ec: EC) =
    for (carriers <- SpecialtyItems.result)
      yield Response[Seq[SpecialtyItem]](
        success = true,
        data = carriers.map(c => c: SpecialtyItem)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- SpecialtyItems.filter(_.id === id).result.headOption)
      yield Response[SpecialtyItem](
        success = option.isDefined,
        data = option.map(c => c: SpecialtyItem),
        message =
          if (option.isDefined) None
          else Some(s"SpecialtyItem with id=$id does not exist")
      )

  override def createAction(model: SpecialtyItem)(implicit ec: EC) =
    for {
      id <- (SpecialtyItems returning SpecialtyItems.map(_.id)) += model
      option <- SpecialtyItems.filter(_.id === id).result.headOption
    }
      yield Response[SpecialtyItem](
        success = option.isDefined,
        data = option.map(c => c: SpecialtyItem),
        message =
          if (option.isDefined) None
          else Some(s"SpecialtyItem could not be created")
      )

  override def updateAction(id: Int, model: SpecialtyItem)(implicit ec: EC) =
    for {
      before <- SpecialtyItems.filter(_.id === id).result.headOption
      rows <- SpecialtyItems.filter(_.id === id).map(_.label).update(model.label)
      after <- SpecialtyItems.filter(_.id === id).result.headOption
    }
      yield Response[Updated[SpecialtyItem]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: SpecialtyItem),
          after.map(c => c: SpecialtyItem)
        ),
        message =
          if (rows != 0) None
          else Some(s"SpecialtyItem with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- SpecialtyItems.filter(_.id === id).result.headOption
      rows <- SpecialtyItems.filter(_.id === id).delete
    }
      yield Response[SpecialtyItem](
        success = rows != 0,
        data = before.map(c => c: SpecialtyItem),
        message =
          if (rows != 0) None
          else Some(s"SpecialtyItem with id=$id does not exist")
      )
}
