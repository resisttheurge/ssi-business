package com.cooksys.ssi.model.schema

import slick.schema.Tables._
import slick.driver.MySQLDriver.api._
import spray.json.DefaultJsonProtocol

case class User(id: Option[Int], username: String, password: Option[String], active: Option[Boolean], roles: Seq[String] = Seq.empty)

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
      def active = self filter (_.active)
      def inactive = self filterNot (_.active)
      def withRoles = self joinLeft UserRoles on (_.id === _.userId)
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

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends DefaultJsonProtocol {

    implicit val `JSON UsersRow` = jsonFormat4(UsersRow)

    implicit val `JSON User` = jsonFormat4(User.apply)
    implicit val `JSON User.Index` = jsonFormat1(Index)
    implicit val `JSON User.Result` = jsonFormat5(Result)

  }

}