package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

import shapeless.syntax.std.tuple._

object PartOrderDao extends CrudDao[PartOrder] {

  override def indexAction(implicit ec: EC) =
    for (carriers <- PartOrders.withDependents.result)
      yield Response[Seq[PartOrder]](
        success = true,
        data = carriers.map(c => c: PartOrder)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- PartOrders.filter(_.id === id).withDependents.result.headOption)
      yield Response[PartOrder](
        success = option.isDefined,
        data = option.map(c => c: PartOrder),
        message =
          if (option.isDefined) None
          else Some(s"PartOrder with id=$id does not exist")
      )

  override def createAction(model: PartOrder)(implicit ec: EC) =
    for {
      id <- (PartOrders returning PartOrders.map(_.id)) += model
      option <- PartOrders.filter(_.id === id).withDependents.result.headOption
    }
      yield Response[PartOrder](
        success = option.isDefined,
        data = option.map(c => c: PartOrder),
        message =
          if (option.isDefined) None
          else Some(s"PartOrder could not be created")
      )

  override def updateAction(id: Int, model: PartOrder)(implicit ec: EC) =
    for {
      before <- PartOrders.filter(_.id === id).withDependents.result.headOption
      rows <- PartOrders.filter(_.id === id).map(r =>
        (r.jobId, r.drawingId, r.status, r.partId, r.manufacturerId, r.vendorId, r.po, r.requestedQuantity, r.stockQuantity,
          r.purchaseQuantity, r.requestDate, r.purchaseDate, r.releaseDate, r.releasedBy))
        .update((model: PartOrdersRow).tail)
      after <- PartOrders.filter(_.id === id).withDependents.result.headOption
    }
      yield Response[Updated[PartOrder]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: PartOrder),
          after.map(c => c: PartOrder)
        ),
        message =
          if (rows != 0) None
          else Some(s"PartOrder with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- PartOrders.filter(_.id === id).withDependents.result.headOption
      rows <- PartOrders.filter(_.id === id).delete
    }
      yield Response[PartOrder](
        success = rows != 0,
        data = before.map(c => c: PartOrder),
        message =
          if (rows != 0) None
          else Some(s"PartOrder with id=$id does not exist")
      )
}
