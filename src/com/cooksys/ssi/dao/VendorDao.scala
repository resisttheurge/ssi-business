package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

object VendorDao extends CrudDao[Vendor] {

  override def indexAction(implicit ec: EC) =
    for (carriers <- Vendors.result)
      yield Response[Seq[Vendor]](
        success = true,
        data = carriers.map(c => c: Vendor)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- Vendors.filter(_.id === id).result.headOption)
      yield Response[Vendor](
        success = option.isDefined,
        data = option.map(c => c: Vendor),
        message =
          if (option.isDefined) None
          else Some(s"Vendor with id=$id does not exist")
      )

  override def createAction(model: Vendor)(implicit ec: EC) =
    for {
      id <- (Vendors returning Vendors.map(_.id)) += model
      option <- Vendors.filter(_.id === id).result.headOption
    }
      yield Response[Vendor](
        success = option.isDefined,
        data = option.map(c => c: Vendor),
        message =
          if (option.isDefined) None
          else Some(s"Vendor could not be created")
      )

  override def updateAction(id: Int, model: Vendor)(implicit ec: EC) =
    for {
      before <- Vendors.filter(_.id === id).result.headOption
      rows <- Vendors.filter(_.id === id).map(_.label).update(model.label)
      after <- Vendors.filter(_.id === id).result.headOption
    }
      yield Response[Updated[Vendor]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: Vendor),
          after.map(c => c: Vendor)
        ),
        message =
          if (rows != 0) None
          else Some(s"Vendor with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- Vendors.filter(_.id === id).result.headOption
      rows <- Vendors.filter(_.id === id).delete
    }
      yield Response[Vendor](
        success = rows != 0,
        data = before.map(c => c: Vendor),
        message =
          if (rows != 0) None
          else Some(s"Vendor with id=$id does not exist")
      )
}
