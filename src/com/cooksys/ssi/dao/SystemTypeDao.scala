package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

object SystemTypeDao extends CrudDao[SystemType] {

  val indexByJobIdQuery =
      Compiled((jobId: Rep[Int]) =>
        for {
          jobSystemType <- JobSystemTypes.filter(_.jobId === jobId)
          systemType <- SystemTypes.filter(_.id === jobSystemType.systemTypeId)
        } yield {
          systemType
        }
      )

  def indexByJobId(jobId: Int)(implicit db: DB, ec: EC) =
    run(
      for {
      types <- indexByJobIdQuery(jobId).result
      } yield {
        Response[Seq[SystemType]](
          success = true,
          data = types.map(t => t: SystemType)
        )
      }
    )

  override def indexAction(implicit ec: EC) =
    for (carriers <- SystemTypes.result)
      yield Response[Seq[SystemType]](
        success = true,
        data = carriers.map(c => c: SystemType)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- SystemTypes.filter(_.id === id).result.headOption)
      yield Response[SystemType](
        success = option.isDefined,
        data = option.map(c => c: SystemType),
        message =
          if (option.isDefined) None
          else Some(s"SystemType with id=$id does not exist")
      )

  override def createAction(model: SystemType)(implicit ec: EC) =
    for {
      id <- (SystemTypes returning SystemTypes.map(_.id)) += model
      option <- SystemTypes.filter(_.id === id).result.headOption
    }
      yield Response[SystemType](
        success = option.isDefined,
        data = option.map(c => c: SystemType),
        message =
          if (option.isDefined) None
          else Some(s"SystemType could not be created")
      )

  override def updateAction(id: Int, model: SystemType)(implicit ec: EC) =
    for {
      before <- SystemTypes.filter(_.id === id).result.headOption
      rows <- SystemTypes.filter(_.id === id).map(_.label).update(model.label)
      after <- SystemTypes.filter(_.id === id).result.headOption
    }
      yield Response[Updated[SystemType]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: SystemType),
          after.map(c => c: SystemType)
        ),
        message =
          if (rows != 0) None
          else Some(s"SystemType with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- SystemTypes.filter(_.id === id).result.headOption
      rows <- SystemTypes.filter(_.id === id).delete
    }
      yield Response[SystemType](
        success = rows != 0,
        data = before.map(c => c: SystemType),
        message =
          if (rows != 0) None
          else Some(s"SystemType with id=$id does not exist")
      )
}
