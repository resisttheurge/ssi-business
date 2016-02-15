package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

object DrawingDao extends CrudDao[Drawing] {

  val indexQuery = Compiled(Drawings.withDependents)
  val readQuery = Compiled((jobId: Rep[Int]) => Drawings.byJobId(jobId).withDependents)

  val indexByJobIdQuery = Compiled((jobId: Rep[Int]) => Drawings.byJobId(jobId).withDependents)

  def indexByJobId(jobId: Int)(implicit db: DB,  ec: EC) =
    run(
      for {
        rows <- indexByJobIdQuery(jobId).result
      } yield {
        Response[Seq[Drawing]](
          success = true,
          data = rows.map(d => d: Drawing)
        )
      }
    )

  override def indexAction(implicit ec: DrawingDao.EC): DrawingDao.DBIOAction[Response[Seq[Drawing]], DrawingDao.NoStream, _] =
    for {
      row <- indexQuery.result
    } yield {
      Response[Seq[Drawing]](
        success = true,
        data = row.map(data => data: Drawing)
      )
    }

  override def readAction(id: Int)(implicit ec: DrawingDao.EC): DrawingDao.DBIOAction[Response[Drawing], DrawingDao.NoStream, _] =
    for {
      row <- readQuery(id).result.headOption
    } yield {
      Response[Drawing](
        success = row.isDefined,
        data = row.map(d => d: Drawing),
        message =
          if (row.isDefined) None
          else s"Drawing with id = $id does not exist"
      )
    }

  override def destroyAction(id: Int)(implicit ec: DrawingDao.EC): DrawingDao.DBIOAction[Response[Drawing], DrawingDao.NoStream, _] =
    for {
      before <- readQuery(id).result.headOption
      deleted <- Drawings.byId(id).delete
    } yield {
      Response[Drawing](
        success = before.nonEmpty && deleted != 0,
        data = before.map(d => d: Drawing),
        message =
          if (before.nonEmpty && deleted != 0) None
          else if (before.isEmpty) s"Drawing with id = $id does not exist"
          else "Drawing"
      )
    }

  override def updateAction(id: Int, model: Drawing)(implicit ec: DrawingDao.EC): DrawingDao.DBIOAction[Response[Updated[Drawing]], DrawingDao.NoStream, _] =
    for {
      before <- readQuery(id).result.headOption
      updated <- Drawings.byId(id).update(model)
      after <- readQuery(id).result.headOption
    } yield {
      Response[Updated[Drawing]](
        success = before.isDefined && (updated != 0),
        data =
          if (before.isEmpty && after.isEmpty) None
          else Updated(
            before = before.map(d => d: Drawing),
            after = after.map(d => d: Drawing)
          ),
        message =
          if (before.isDefined && (updated != 0)) None
          else s"Could not update Drawing with id = $id"
      )
    }

  override def createAction(model: Drawing)(implicit ec: DrawingDao.EC): DrawingDao.DBIOAction[Response[Drawing], DrawingDao.NoStream, _] =
    for {
      requestId <- (ShippingRequests returning ShippingRequests.map(_.id)) += toShippingRequestsRow(model.info.getOrElse(ShippingRequest()))
      drawingId <- (Drawings returning Drawings.map(_.id)) += model
      drawing <- readQuery(drawingId).result.headOption
    } yield {
      Response[Drawing](
        success = drawing.isDefined,
        data = drawing.map(d => d: Drawing),
        message =
          if(drawing.isDefined) None
          else "Drawing could not be created"
      )
    }
}
