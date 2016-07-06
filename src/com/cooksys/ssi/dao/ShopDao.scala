package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

object ShopDao extends CrudDao[Shop] {

  override def indexAction(implicit ec: EC) =
    for (carriers <- Shops.result)
      yield Response[Seq[Shop]](
        success = true,
        data = carriers.map(c => c: Shop)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- Shops.filter(_.id === id).result.headOption)
      yield Response[Shop](
        success = option.isDefined,
        data = option.map(c => c: Shop),
        message =
          if (option.isDefined) None
          else Some(s"Shop with id=$id does not exist")
      )

  override def createAction(model: Shop)(implicit ec: EC) =
    for {
      id <- (Shops returning Shops.map(_.id)) += model
      option <- Shops.filter(_.id === id).result.headOption
    }
      yield Response[Shop](
        success = option.isDefined,
        data = option.map(c => c: Shop),
        message =
          if (option.isDefined) None
          else Some(s"Shop could not be created")
      )

  override def updateAction(id: Int, model: Shop)(implicit ec: EC) =
    for {
      before <- Shops.filter(_.id === id).result.headOption
      rows <- Shops.filter(_.id === id).map(_.label).update(model.label)
      after <- Shops.filter(_.id === id).result.headOption
    }
      yield Response[Updated[Shop]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: Shop),
          after.map(c => c: Shop)
        ),
        message =
          if (rows != 0) None
          else Some(s"Shop with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- Shops.filter(_.id === id).result.headOption
      rows <- Shops.filter(_.id === id).delete
    }
      yield Response[Shop](
        success = rows != 0,
        data = before.map(c => c: Shop),
        message =
          if (rows != 0) None
          else Some(s"Shop with id=$id does not exist")
      )
}
