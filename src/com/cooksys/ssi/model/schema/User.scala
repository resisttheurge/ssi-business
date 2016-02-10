package com.cooksys.ssi.model.schema

import slick.schema.Tables._
import slick.driver.MySQLDriver.api._
import spray.json.DefaultJsonProtocol

import scala.concurrent.ExecutionContext

case class User(id: Option[Int],
                username: String,
                password: Option[String],
                active: Option[Boolean],
                roles: Option[Seq[String]] = None)

object User {

  case class Index(users: Seq[User])

  type Create = User
  val Create = User

  type Update = User
  val Update = User

  case class Result(success: Boolean, user: Option[User], before: Option[User], after: Option[User], message: Option[String])

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toUsersRow(user: User): UsersRow =
      UsersRow(if (user.id.isDefined) user.id.get else -1, user.username, user.password.get, user.active.getOrElse(true))

    implicit def fromUsersRow(usersRow: UsersRow): User =
      User(Option(usersRow.id), usersRow.username, Option(usersRow.password), Option(usersRow.active))

    implicit class UserQueryExtensions[C[_]](self: Query[Users, UsersRow, C]) {
      def byId(id: Int) = self filter (_.id === id)

      def byCredentials(credentials: Credentials) =
        self filter (u => u.username === credentials.username && u.password === credentials.password)

      def active = self filter (_.active)

      def inactive = self filterNot (_.active)

      def withRoles = self joinLeft UserRoles.active on (_.id === _.userId)

      def update(user: User.Update) =
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

    implicit class UserRoleQueryExtensions[C[_]](self: Query[UserRoles, UserRolesRow, C]) {

      def active = self filter (_.active)

      def inactive = self filterNot (_.active)

      def byUserId(id: Int) = self filter(_.userId === id)

      def byRoles(roles: Seq[String]) = self filter (_.role inSet roles)

    }

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends RootJsonProtocol {

    implicit val `JSON UsersRow` = jsonFormat4(UsersRow)

    implicit val `JSON User` = jsonFormat5(User.apply)
    implicit val `JSON User.Index` = jsonFormat1(Index)
    implicit val `JSON User.Result` = jsonFormat5(Result)

  }

  import Implicits._

  /*
   * turns flat (UsersRow, UserRolesRow) query results into a list of User objects with seq's of roles nested within
   */
  def aggregate(userRoles: Seq[(UsersRow, Option[UserRolesRow])]): Seq[User] =
    userRoles
      .map {
        case (user, opt) =>
          if (opt.isDefined) (user: User).copy(roles = Some(Seq(opt.get.role)))
          else user: User
      }
      .foldLeft(Seq.empty[User])(
        (seq: Seq[User], user: User) =>
          if (seq.nonEmpty && seq.exists(_.id == user.id))
            seq.map {
              case u if u.id == user.id =>
                (u.roles, user.roles) match {
                  case (Some(r1), Some(r2)) => u.copy(roles = Some(r1 ++ r2))
                  case (Some(r1), None) => u
                  case (None, Some(r2)) => user
                  case (None, None) => u
                }
              case u => u
            }
          else seq :+ user
      )

}