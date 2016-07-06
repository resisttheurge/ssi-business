package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

object ShippingGroupItemDao extends CrudDao[ShippingGroupItem] {

  def indexByShippingGroupId(id: Int)(implicit db: DB, ec: EC) =
    run(
      for {
        items <- ShippingGroupItems.filter(_.shippingGroupId === id).withDependents.result
      } yield {
        Response[Seq[ShippingGroupItem]](
          success = true,
          data = items.map(i => i: ShippingGroupItem)
        )
      }
    )

  override def indexAction(implicit ec: EC) =
    for (carriers <- ShippingGroupItems.withDependents.result)
      yield Response[Seq[ShippingGroupItem]](
        success = true,
        data = carriers.map(c => c: ShippingGroupItem)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- ShippingGroupItems.filter(_.id === id).withDependents.result.headOption)
      yield Response[ShippingGroupItem](
        success = option.isDefined,
        data = option.map(c => c: ShippingGroupItem),
        message =
          if (option.isDefined) None
          else Some(s"ShippingGroupItem with id=$id does not exist")
      )

  override def createAction(model: ShippingGroupItem)(implicit ec: EC) =
    for {
      id <- (ShippingGroupItems returning ShippingGroupItems.map(_.id)) += model
      option <- ShippingGroupItems.filter(_.id === id).withDependents.result.headOption
    }
      yield Response[ShippingGroupItem](
        success = option.isDefined,
        data = option.map(c => c: ShippingGroupItem),
        message =
          if (option.isDefined) None
          else Some(s"ShippingGroupItem could not be created")
      )

  override def updateAction(id: Int, model: ShippingGroupItem)(implicit ec: EC) =
    for {
      before <- ShippingGroupItems.filter(_.id === id).withDependents.result.headOption
      rows <- ShippingGroupItems.filter(_.id === id).map(_.label).update(model.label)
      after <- ShippingGroupItems.filter(_.id === id).withDependents.result.headOption
    }
      yield Response[Updated[ShippingGroupItem]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: ShippingGroupItem),
          after.map(c => c: ShippingGroupItem)
        ),
        message =
          if (rows != 0) None
          else Some(s"ShippingGroupItem with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- ShippingGroupItems.filter(_.id === id).withDependents.result.headOption
      rows <- ShippingGroupItems.filter(_.id === id).delete
    }
      yield Response[ShippingGroupItem](
        success = rows != 0,
        data = before.map(c => c: ShippingGroupItem),
        message =
          if (rows != 0) None
          else Some(s"ShippingGroupItem with id=$id does not exist")
      )
}
