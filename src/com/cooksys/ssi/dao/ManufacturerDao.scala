package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

object ManufacturerDao extends CrudDao[Manufacturer] {

  override def indexAction(implicit ec: EC) =
    for (carriers <- Manufacturers.result)
      yield Response[Seq[Manufacturer]](
        success = true,
        data = carriers.map(c => c: Manufacturer)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- Manufacturers.filter(_.id === id).result.headOption)
      yield Response[Manufacturer](
        success = option.isDefined,
        data = option.map(c => c: Manufacturer),
        message =
          if (option.isDefined) None
          else Some(s"Manufacturer with id=$id does not exist")
      )

  override def createAction(model: Manufacturer)(implicit ec: EC) =
    for {
      id <- (Manufacturers returning Manufacturers.map(_.id)) += model
      option <- Manufacturers.filter(_.id === id).result.headOption
    }
      yield Response[Manufacturer](
        success = option.isDefined,
        data = option.map(c => c: Manufacturer),
        message =
          if (option.isDefined) None
          else Some(s"Manufacturer could not be created")
      )

  override def updateAction(id: Int, model: Manufacturer)(implicit ec: EC) =
    for {
      before <- Manufacturers.filter(_.id === id).result.headOption
      rows <- Manufacturers.filter(_.id === id).map(_.label).update(model.label)
      after <- Manufacturers.filter(_.id === id).result.headOption
    }
      yield Response[Updated[Manufacturer]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: Manufacturer),
          after.map(c => c: Manufacturer)
        ),
        message =
          if (rows != 0) None
          else Some(s"Manufacturer with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- Manufacturers.filter(_.id === id).result.headOption
      rows <- Manufacturers.filter(_.id === id).delete
    }
      yield Response[Manufacturer](
        success = rows != 0,
        data = before.map(c => c: Manufacturer),
        message =
          if (rows != 0) None
          else Some(s"Manufacturer with id=$id does not exist")
      )
}
