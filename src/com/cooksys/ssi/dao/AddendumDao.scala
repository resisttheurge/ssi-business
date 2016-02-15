package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._
import shapeless.syntax.std.tuple._

object AddendumDao extends CrudDao[Addendum] {

  val indexByJobIdQuery =
    Compiled((id: Rep[Int]) => Addenda.filter(_.jobId === id).withDependents)

  def indexByJobId(id: Int)(implicit db: DB, ec: EC) =
    run(
      for {
        rows <- indexByJobIdQuery(id).result
      } yield {
        Response[Seq[Addendum]](
          success = true,
          data = rows.map(r => r: Addendum)
        )
      }
    )

  override def indexAction(implicit ec: EC) =
    for (carriers <- Addenda.withDependents.result)
      yield Response[Seq[Addendum]](
        success = true,
        data = carriers.map(c => c: Addendum)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- Addenda.filter(_.id === id).withDependents.result.headOption)
      yield Response[Addendum](
        success = option.isDefined,
        data = option.map(c => c: Addendum),
        message =
          if (option.isDefined) None
          else Some(s"Addendum with id=$id does not exist")
      )

  override def createAction(model: Addendum)(implicit ec: EC) =
    for {
      id <- (Addenda returning Addenda.map(_.id)) += model
      option <- Addenda.filter(_.id === id).withDependents.result.headOption
    }
      yield Response[Addendum](
        success = option.isDefined,
        data = option.map(c => c: Addendum),
        message =
          if (option.isDefined) None
          else Some(s"Addendum could not be created")
      )

  override def updateAction(id: Int, model: Addendum)(implicit ec: EC) =
    for {
      before <- Addenda.filter(_.id === id).withDependents.result.headOption
      rows <- Addenda.filter(_.id === id).map(r => (r.label, r.description, r.contractPrice, r.salespersonId, r.contactId, r.created)).update((model: AddendaRow).tail.tail)
      after <- Addenda.filter(_.id === id).withDependents.result.headOption
    }
      yield Response[Updated[Addendum]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: Addendum),
          after.map(c => c: Addendum)
        ),
        message =
          if (rows != 0) None
          else Some(s"Addendum with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- Addenda.filter(_.id === id).withDependents.result.headOption
      rows <- Addenda.filter(_.id === id).delete
    }
      yield Response[Addendum](
        success = rows != 0,
        data = before.map(c => c: Addendum),
        message =
          if (rows != 0) None
          else Some(s"Addendum with id=$id does not exist")
      )
}
