package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._

object ContactDao extends CrudDao[Contact] {

  override def indexAction(implicit ec: EC) =
    for (carriers <- Contacts.result)
      yield Response[Seq[Contact]](
        success = true,
        data = carriers.map(c => c: Contact)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- Contacts.filter(_.id === id).result.headOption)
      yield Response[Contact](
        success = option.isDefined,
        data = option.map(c => c: Contact),
        message =
          if (option.isDefined) None
          else Some(s"Contact with id=$id does not exist")
      )

  override def createAction(model: Contact)(implicit ec: EC) =
    for {
      id <- (Contacts returning Contacts.map(_.id)) += model
      option <- Contacts.filter(_.id === id).result.headOption
    }
      yield Response[Contact](
        success = option.isDefined,
        data = option.map(c => c: Contact),
        message =
          if (option.isDefined) None
          else Some(s"Contact could not be created")
      )

  override def updateAction(id: Int, model: Contact)(implicit ec: EC) =
    for {
      before <- Contacts.filter(_.id === id).result.headOption
      rows <- Contacts.filter(_.id === id).map(r => (r.label, r.phone, r.fax, r.email)).update((model.label, model.phone, model.fax, model.email))
      after <- Contacts.filter(_.id === id).result.headOption
    }
      yield Response[Updated[Contact]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: Contact),
          after.map(c => c: Contact)
        ),
        message =
          if (rows != 0) None
          else Some(s"Contact with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- Contacts.filter(_.id === id).result.headOption
      rows <- Contacts.filter(_.id === id).delete
    }
      yield Response[Contact](
        success = rows != 0,
        data = before.map(c => c: Contact),
        message =
          if (rows != 0) None
          else Some(s"Contact with id=$id does not exist")
      )
}
