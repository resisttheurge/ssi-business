package com.cooksys.ssi.utils.extensions


import slick.schema.Tables._
import slick.driver.MySQLDriver.api._
import com.cooksys.ssi.models._

object QueryExtensions extends QueryExtensions
trait QueryExtensions {

  implicit class AddendaQueryExtensions[C[_]](self: Query[Addenda, AddendaRow, C]) {
    def withDependents =
      (self joinLeft Salespeople on (_.salespersonId === _.id) joinLeft Contacts on (_._1.contactId === _.id))
        .map {
          case ((addendum, salesperson), contact) => (addendum, salesperson, contact)
        }
  }

  implicit class JobsQueryExtensions[C[_]](self: Query[Jobs, JobsRow, C]) {

    def byId(id: Int) = self filter (_.id === id)

    def withDependents =
      for {
        ((((job, shop), salesperson), customer), contact) <- {
          self
            .joinLeft(Shops).on(_.shopId === _.id)
            .joinLeft(Salespeople).on(_._1.salespersonId === _.id)
            .joinLeft(Customers).on(_._1._1.customerId === _.id)
            .joinLeft(Contacts).on(_._1._1._1.contactId === _.id)
        }
      } yield
        (job, shop, salesperson, customer, contact)

  }

  implicit class UsersQueryExtensions[C[_]](self: Query[Users, UsersRow, C]) {
    def byId(id: Int) = self filter (_.id === id)

    def byCredentials(credentials: Credentials) =
      self filter (u => u.username === credentials.username && u.password === credentials.password)

    def active = self filter (_.active)

    def inactive = self filterNot (_.active)

    def withRoles = self joinLeft UserRoles.active on (_.id === _.userId)

    def update(user: User) =
      (user.password, user.active) match {
        case (Some(password), Some(active)) =>
          self
            .map(u => (u.username, u.password, u.active))
            .update((user.username, password, active))
        case (Some(password), None) =>
          self
            .map(u => (u.username, u.password))
            .update((user.username, password))
        case (None, Some(active)) =>
          self
            .map(u => (u.username, u.active))
            .update((user.username, active))
        case (None, None) =>
          self
            .map(_.username)
            .update(user.username)
      }
  }

  implicit class UserRolesQueryExtensions[C[_]](self: Query[UserRoles, UserRolesRow, C]) {

    def active = self filter (_.active)

    def inactive = self filterNot (_.active)

    def byUserId(id: Int) = self filter(_.userId === id)

    def byRoles(roles: Seq[String]) = self filter (_.role inSet roles)

  }

}


