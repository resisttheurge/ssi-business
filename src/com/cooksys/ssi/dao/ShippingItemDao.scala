package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._
import shapeless.syntax.std.tuple._

object ShippingItemDao extends CrudDao[ShippingItem] {

  override def indexAction(implicit ec: EC) =
    for (carriers <- ShippingItems.withDependents.result)
      yield Response[Seq[ShippingItem]](
        success = true,
        data = carriers.map(c => c: ShippingItem)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- ShippingItems.filter(_.id === id).withDependents.result.headOption)
      yield Response[ShippingItem](
        success = option.isDefined,
        data = option.map(c => c: ShippingItem),
        message =
          if (option.isDefined) None
          else Some(s"ShippingItem with id=$id does not exist")
      )

  override def createAction(model: ShippingItem)(implicit ec: EC) =
    for {
      id <- (ShippingItems returning ShippingItems.map(_.id)) += model
      option <- ShippingItems.filter(_.id === id).withDependents.result.headOption
    }
      yield Response[ShippingItem](
        success = option.isDefined,
        data = option.map(c => c: ShippingItem),
        message =
          if (option.isDefined) None
          else Some(s"ShippingItem could not be created")
      )

  override def updateAction(id: Int, model: ShippingItem)(implicit ec: EC) =
    for {
      before <- ShippingItems.filter(_.id === id).withDependents.result.headOption
      rows <- ShippingItems.filter(_.id === id).map(r => (r.status, r.label, r.requested, r.completed, r.remarks, r.shopId)).update((model: ShippingItemsRow).tail)
      after <- ShippingItems.filter(_.id === id).withDependents.result.headOption
    }
      yield Response[Updated[ShippingItem]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: ShippingItem),
          after.map(c => c: ShippingItem)
        ),
        message =
          if (rows != 0) None
          else Some(s"ShippingItem with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- ShippingItems.filter(_.id === id).withDependents.result.headOption
      rows <- ShippingItems.filter(_.id === id).delete
    }
      yield Response[ShippingItem](
        success = rows != 0,
        data = before.map(c => c: ShippingItem),
        message =
          if (rows != 0) None
          else Some(s"ShippingItem with id=$id does not exist")
      )
}
