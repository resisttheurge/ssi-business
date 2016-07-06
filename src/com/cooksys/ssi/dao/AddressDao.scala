package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._
import shapeless.syntax.std.tuple._

object AddressDao extends CrudDao[Address] {

  override def indexAction(implicit ec: EC) =
    for (carriers <- Addresses.result)
      yield Response[Seq[Address]](
        success = true,
        data = carriers.map(c => c: Address)
      )

  override def readAction(id: Int)(implicit ec: EC) =
    for (option <- Addresses.filter(_.id === id).result.headOption)
      yield Response[Address](
        success = option.isDefined,
        data = option.map(c => c: Address),
        message =
          if (option.isDefined) None
          else Some(s"Address with id=$id does not exist")
      )

  override def createAction(model: Address)(implicit ec: EC) =
    for {
      id <- (Addresses returning Addresses.map(_.id)) += model
      option <- Addresses.filter(_.id === id).result.headOption
    }
      yield Response[Address](
        success = option.isDefined,
        data = option.map(c => c: Address),
        message =
          if (option.isDefined) None
          else Some(s"Address could not be created")
      )

  override def updateAction(id: Int, model: Address)(implicit ec: EC) =
    for {
      before <- Addresses.filter(_.id === id).result.headOption
      rows <- Addresses.filter(_.id === id).map(r => (r.lines, r.city, r.stateOrProvince, r.postalCode, r.country)).update((model: AddressesRow).tail)
      after <- Addresses.filter(_.id === id).result.headOption
    }
      yield Response[Updated[Address]](
        success = rows != 0,
        data = Updated(
          before.map(c => c: Address),
          after.map(c => c: Address)
        ),
        message =
          if (rows != 0) None
          else Some(s"Address with id=$id does not exist")
      )

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- Addresses.filter(_.id === id).result.headOption
      rows <- Addresses.filter(_.id === id).delete
    }
      yield Response[Address](
        success = rows != 0,
        data = before.map(c => c: Address),
        message =
          if (rows != 0) None
          else Some(s"Address with id=$id does not exist")
      )
}
