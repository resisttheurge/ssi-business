package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import shapeless.syntax.std.tuple._
import slick.schema.Tables._

object ShippingItemZoneDao extends CrudDao[ShippingItemZone] {

  def indexByShippingItemId(id: Int)(implicit db: DB, ec: EC) =
    run(
      for {
        zones <- ShippingItemZones.filter(_.shippingItemId === id).withDependents.result
      } yield {
        Response[Seq[ShippingItemZone]](
          success = true,
          data = zones.map(z => z: ShippingItemZone)
        )
      }
    )

  override def indexAction(implicit ec: EC) =
    for (carriers <- ShippingItemZones.withDependents.result)
      yield Response[Seq[ShippingItemZone]](
        success = true,
        data = carriers.map(c => c: ShippingItemZone)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- ShippingItemZones.filter(_.id === id).withDependents.result.headOption)
      yield Response[ShippingItemZone](
        success = option.isDefined,
        data = option.map(c => c: ShippingItemZone),
        message =
          if (option.isDefined) None
          else Some(s"ShippingItemZone with id=$id does not exist")
      )

  override def createAction(model: ShippingItemZone)(implicit ec: EC) =
    for {
      id <- (ShippingItemZones returning ShippingItemZones.map(_.id)) += model
      option <- ShippingItemZones.filter(_.id === id).withDependents.result.headOption
    }
      yield Response[ShippingItemZone](
        success = option.isDefined,
        data = option.map(c => c: ShippingItemZone),
        message =
          if (option.isDefined) None
          else Some(s"ShippingItemZone could not be created")
      )

  override def updateAction(id: Int, model: ShippingItemZone)(implicit ec: EC) =
    for {
      before <- ShippingItemZones.filter(_.id === id).withDependents.result.headOption
      rows <- ShippingItemZones.filter(_.id === id).map(_.quantity).update(model.quantity)
      after <- ShippingItemZones.filter(_.id === id).withDependents.result.headOption
    }
      yield Response[Updated[ShippingItemZone]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: ShippingItemZone),
          after.map(c => c: ShippingItemZone)
        ),
        message =
          if (rows != 0) None
          else Some(s"ShippingItemZone with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- ShippingItemZones.filter(_.id === id).withDependents.result.headOption
      rows <- ShippingItemZones.filter(_.id === id).delete
    }
      yield Response[ShippingItemZone](
        success = rows != 0,
        data = before.map(c => c: ShippingItemZone),
        message =
          if (rows != 0) None
          else Some(s"ShippingItemZone with id=$id does not exist")
      )
}
