package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

object SalespersonDao extends BaseDao[Salesperson] {

  override def indexAction(implicit ec: EC) =
    for (carriers <- Salespeople.result)
      yield Response[Seq[Salesperson]](
        success = true,
        data = carriers.map(c => c: Salesperson)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- Salespeople.filter(_.id === id).result.headOption)
      yield Response[Salesperson](
        success = option.isDefined,
        data = option.map(c => c: Salesperson),
        message =
          if (option.isDefined) None
          else Some(s"Salesperson with id=$id does not exist")
      )

  override def createAction(model: Salesperson)(implicit ec: EC) =
    for {
      id <- (Salespeople returning Salespeople.map(_.id)) += model
      option <- Salespeople.filter(_.id === id).result.headOption
    }
      yield Response[Salesperson](
        success = option.isDefined,
        data = option.map(c => c: Salesperson),
        message =
          if (option.isDefined) None
          else Some(s"Salesperson could not be created")
      )

  override def updateAction(id: Int, model: Salesperson)(implicit ec: EC) =
    for {
      before <- Salespeople.filter(_.id === id).result.headOption
      rows <- Salespeople.filter(_.id === id).map(_.label).update(model.label)
      after <- Salespeople.filter(_.id === id).result.headOption
    }
      yield Response[Updated[Salesperson]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: Salesperson),
          after.map(c => c: Salesperson)
        ),
        message =
          if (rows != 0) None
          else Some(s"Salesperson with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- Salespeople.filter(_.id === id).result.headOption
      rows <- Salespeople.filter(_.id === id).delete
    }
      yield Response[Salesperson](
        success = rows != 0,
        data = before.map(c => c: Salesperson),
        message =
          if (rows != 0) None
          else Some(s"Salesperson with id=$id does not exist")
      )
}
