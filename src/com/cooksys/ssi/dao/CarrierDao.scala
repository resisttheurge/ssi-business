package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

object CarrierDao extends CrudDao[Carrier] {

  override def indexAction(implicit ec: EC) =
    for (carriers <- Carriers.result)
      yield Response[Seq[Carrier]](
        success = true,
        data = carriers.map(c => c: Carrier)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- Carriers.filter(_.id === id).result.headOption)
      yield Response[Carrier](
        success = option.isDefined,
        data = option.map(c => c: Carrier),
        message =
          if (option.isDefined) None
          else Some(s"Carrier with id=$id does not exist")
      )

  override def createAction(model: Carrier)(implicit ec: EC) =
    for {
      id <- (Carriers returning Carriers.map(_.id)) += model
      option <- Carriers.filter(_.id === id).result.headOption
    }
      yield Response[Carrier](
        success = option.isDefined,
        data = option.map(c => c: Carrier),
        message =
          if (option.isDefined) None
          else Some(s"Carrier could not be created")
      )

  override def updateAction(id: Int, model: Carrier)(implicit ec: EC) =
    for {
      before <- Carriers.filter(_.id === id).result.headOption
      rows <- Carriers.filter(_.id === id).map(_.label).update(model.label)
      after <- Carriers.filter(_.id === id).result.headOption
    }
      yield Response[Updated[Carrier]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: Carrier),
          after.map(c => c: Carrier)
        ),
        message =
          if (rows != 0) None
          else Some(s"Carrier with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- Carriers.filter(_.id === id).result.headOption
      rows <- Carriers.filter(_.id === id).delete
    }
      yield Response[Carrier](
        success = rows != 0,
        data = before.map(c => c: Carrier),
        message =
          if (rows != 0) None
          else Some(s"Carrier with id=$id does not exist")
      )
}
