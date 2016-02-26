package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

import shapeless.syntax.std.tuple._

object ShipmentDao extends CrudDao[Shipment] {

  def indexByJobId(id: Int)(implicit ec: EC, db: DB) =
    run(
      for {
        pos <- Shipments.filter(_.jobId === id).withDependents.result
      } yield {
        Response[Seq[Shipment]](
          success = true,
          data = pos.map(po => po: Shipment)
        )
      }
    )

  override def indexAction(implicit ec: EC) =
    for (carriers <- Shipments.withDependents.result)
      yield Response[Seq[Shipment]](
        success = true,
        data = carriers.map(c => c: Shipment)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- Shipments.filter(_.id === id).withDependents.result.headOption)
      yield Response[Shipment](
        success = option.isDefined,
        data = option.map(c => c: Shipment),
        message =
          if (option.isDefined) None
          else Some(s"Shipment with id=$id does not exist")
      )

  override def createAction(model: Shipment)(implicit ec: EC) =
    for {
      id <- (Shipments returning Shipments.map(_.id)) += model
      option <- Shipments.filter(_.id === id).withDependents.result.headOption
    }
      yield Response[Shipment](
        success = option.isDefined,
        data = option.map(c => c: Shipment),
        message =
          if (option.isDefined) None
          else Some(s"Shipment could not be created")
      )

  override def updateAction(id: Int, model: Shipment)(implicit ec: EC) =
    for {
      before <- Shipments.filter(_.id === id).withDependents.result.headOption
      rows <- Shipments.filter(_.id === id).map(r =>
        (r.jobId, r.number, r.status, r.shopId, r.carrierId, r.weight, r.billOfLading, r.shipDate, r.contactId, r.addressId)
      )
        .update((model: ShipmentsRow).tail)
      after <- Shipments.filter(_.id === id).withDependents.result.headOption
    }
      yield Response[Updated[Shipment]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: Shipment),
          after.map(c => c: Shipment)
        ),
        message =
          if (rows != 0) None
          else Some(s"Shipment with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- Shipments.filter(_.id === id).withDependents.result.headOption
      rows <- Shipments.filter(_.id === id).delete
    }
      yield Response[Shipment](
        success = rows != 0,
        data = before.map(c => c: Shipment),
        message =
          if (rows != 0) None
          else Some(s"Shipment with id=$id does not exist")
      )
}
