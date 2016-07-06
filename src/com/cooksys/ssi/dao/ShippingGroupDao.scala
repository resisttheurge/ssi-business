package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

object ShippingGroupDao extends CrudDao[ShippingGroup] {
  val indexQuery = Compiled(ShippingGroups.withDependents)
  val readQuery = Compiled((id: Rep[Int]) => ShippingGroups.byId(id).withDependents)

  val indexByJobIdQuery = Compiled((jobId: Rep[Int]) => ShippingGroups.byJobId(jobId).withDependents)

  def indexByJobId(jobId: Int)(implicit db: DB,  ec: EC) =
    run(
      for {
        rows <- indexByJobIdQuery(jobId).result
      } yield {
        Response[Seq[ShippingGroup]](
          success = true,
          data = rows.map(d => d: ShippingGroup)
        )
      }
    )

  override def indexAction(implicit ec: ShippingGroupDao.EC): ShippingGroupDao.DBIOAction[Response[Seq[ShippingGroup]], ShippingGroupDao.NoStream, _] =
    for {
      row <- indexQuery.result
    } yield {
      Response[Seq[ShippingGroup]](
        success = true,
        data = row.map(data => data: ShippingGroup)
      )
    }

  override def readAction(id: Int)(implicit ec: ShippingGroupDao.EC): ShippingGroupDao.DBIOAction[Response[ShippingGroup], ShippingGroupDao.NoStream, _] =
    for {
      row <- readQuery(id).result.headOption
    } yield {
      Response[ShippingGroup](
        success = row.isDefined,
        data = row.map(d => d: ShippingGroup),
        message =
          if (row.isDefined) None
          else s"ShippingGroup with id = $id does not exist"
      )
    }

  override def destroyAction(id: Int)(implicit ec: ShippingGroupDao.EC): ShippingGroupDao.DBIOAction[Response[ShippingGroup], ShippingGroupDao.NoStream, _] =
    for {
      before <- readQuery(id).result.headOption
      deleted <- ShippingGroups.byId(id).delete
    } yield {
      Response[ShippingGroup](
        success = before.nonEmpty && deleted != 0,
        data = before.map(d => d: ShippingGroup),
        message =
          if (before.nonEmpty && deleted != 0) None
          else if (before.isEmpty) s"ShippingGroup with id = $id does not exist"
          else "ShippingGroup"
      )
    }

  override def updateAction(id: Int, model: ShippingGroup)(implicit ec: ShippingGroupDao.EC): ShippingGroupDao.DBIOAction[Response[Updated[ShippingGroup]], ShippingGroupDao.NoStream, _] =
    for {
      before <- readQuery(id).result.headOption
      updatedInfo <- ShippingRequests.byId(model.info.get.id.get).update(model.info.get)
      updated <- ShippingGroups.byId(id).update(model)
      after <- readQuery(id).result.headOption
    } yield {
      Response[Updated[ShippingGroup]](
        success = before.isDefined && (updated != 0),
        data =
          if (before.isEmpty && after.isEmpty) None
          else Updated(
            before = before.map(d => d: ShippingGroup),
            after = after.map(d => d: ShippingGroup)
          ),
        message =
          if (before.isDefined && (updated != 0)) None
          else s"Could not update ShippingGroup with id = $id"
      )
    }

  override def createAction(model: ShippingGroup)(implicit ec: ShippingGroupDao.EC): ShippingGroupDao.DBIOAction[Response[ShippingGroup], ShippingGroupDao.NoStream, _] =
    for {
      requestId <- (ShippingRequests returning ShippingRequests.map(_.id)) += toShippingRequestsRow(model.info.getOrElse(ShippingRequest()))
      drawingId <- (ShippingGroups returning ShippingGroups.map(_.id)) += model.copy(info = ShippingRequest(id = requestId))
      drawing <- readQuery(drawingId).result.headOption
    } yield {
      Response[ShippingGroup](
        success = drawing.isDefined,
        data = drawing.map(d => d: ShippingGroup),
        message =
          if(drawing.isDefined) None
          else "ShippingGroup could not be created"
      )
    }
}
