package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

object ShipmentItemDao extends CrudDao[ShipmentItem] {

  def indexByShipmentId(id: Int) =
    run(
      for {
        items <- ShipmentItems.filter(_.shipmentId === id).withDependents.result
      } yield {
        Response[Seq[ShipmentItem]](
          success = true,
          data = items.map(i => i: ShipmentItem)
        )
      }
    )

  override def indexAction(implicit ec: EC) =
    for (carriers <- ShipmentItems.withDependents.result)
      yield Response[Seq[ShipmentItem]](
        success = true,
        data = carriers.map(c => c: ShipmentItem)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- ShipmentItems.filter(_.id === id).withDependents.result.headOption)
      yield Response[ShipmentItem](
        success = option.isDefined,
        data = option.map(c => c: ShipmentItem),
        message =
          if (option.isDefined) None
          else Some(s"ShipmentItem with id=$id does not exist")
      )

  override def createAction(model: ShipmentItem)(implicit ec: EC) =
    for {
      id <- (ShipmentItems returning ShipmentItems.map(_.id)) += model
      option <- ShipmentItems.filter(_.id === id).withDependents.result.headOption
    }
      yield Response[ShipmentItem](
        success = option.isDefined,
        data = option.map(c => c: ShipmentItem),
        message =
          if (option.isDefined) None
          else Some(s"ShipmentItem could not be created")
      )

  override def updateAction(id: Int, model: ShipmentItem)(implicit ec: EC) =
    for {
      before <- ShipmentItems.filter(_.id === id).withDependents.result.headOption
      rows <- ShipmentItems.filter(_.id === id).map(_.quantity).update(model.quantity)
      after <- ShipmentItems.filter(_.id === id).withDependents.result.headOption
    }
      yield Response[Updated[ShipmentItem]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: ShipmentItem),
          after.map(c => c: ShipmentItem)
        ),
        message =
          if (rows != 0) None
          else Some(s"ShipmentItem with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- ShipmentItems.filter(_.id === id).withDependents.result.headOption
      rows <- ShipmentItems.filter(_.id === id).delete
    }
      yield Response[ShipmentItem](
        success = rows != 0,
        data = before.map(c => c: ShipmentItem),
        message =
          if (rows != 0) None
          else Some(s"ShipmentItem with id=$id does not exist")
      )
}
