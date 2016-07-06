package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

object CustomerDao extends CrudDao[Customer] {

  override def indexAction(implicit ec: EC) =
    for (carriers <- Customers.result)
      yield Response[Seq[Customer]](
        success = true,
        data = carriers.map(c => c: Customer)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- Customers.filter(_.id === id).result.headOption)
      yield Response[Customer](
        success = option.isDefined,
        data = option.map(c => c: Customer),
        message =
          if (option.isDefined) None
          else Some(s"Customer with id=$id does not exist")
      )

  override def createAction(model: Customer)(implicit ec: EC) =
    for {
      id <- (Customers returning Customers.map(_.id)) += model
      option <- Customers.filter(_.id === id).result.headOption
    }
      yield Response[Customer](
        success = option.isDefined,
        data = option.map(c => c: Customer),
        message =
          if (option.isDefined) None
          else Some(s"Customer could not be created")
      )

  override def updateAction(id: Int, model: Customer)(implicit ec: EC) =
    for {
      before <- Customers.filter(_.id === id).result.headOption
      rows <- Customers.filter(_.id === id).map(_.label).update(model.label)
      after <- Customers.filter(_.id === id).result.headOption
    }
      yield Response[Updated[Customer]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: Customer),
          after.map(c => c: Customer)
        ),
        message =
          if (rows != 0) None
          else Some(s"Customer with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- Customers.filter(_.id === id).result.headOption
      rows <- Customers.filter(_.id === id).delete
    }
      yield Response[Customer](
        success = rows != 0,
        data = before.map(c => c: Customer),
        message =
          if (rows != 0) None
          else Some(s"Customer with id=$id does not exist")
      )
}
