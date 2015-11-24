package app.models

import lib.model.Model
import lib.util.syntax.all._
import scalikejdbc._
import scalikejdbc.async._

import scala.concurrent.Future

case class User(id: Int, username: String, password: String, active: Boolean) extends Model[User]

object User extends Model.Companion[User] {

  override val tableName = "user"
  override val columns = Seq("id", "username", "password", "active")

  val u = syntax

  override def apply(u: ResultName[User])(rs: WrappedResultSet): User =
    User(
      id = rs.get(u.id),
      username = rs.get(u.username),
      password = rs.get(u.password),
      active = rs.get(u.active)
    )

  override def option(u: ResultName[User])(rs: WrappedResultSet): Option[User] =
    for {
      id <- rs.intOpt(u.id)
      username <- rs.stringOpt(u.username)
      password <- rs.stringOpt(u.password)
      active <- rs.booleanOpt(u.active)
    } yield User(id, username, password, active)

  def create(username: String, password: String)(implicit ecs: ECS): Future[User] =
    for {
      key <- withSQL {
        insert
          .into(User)
          .namedValues(
            column.username -> username,
            column.password -> password
          )
      }
        .updateAndReturnGeneratedKey
        .future

      user <- withSQL {
        select
          .from(User as u)
          .where
          .eq(u.id, key)
      }
        .map(User(u))
        .single
        .future

    } yield user.get


  def authenticate(username: String, password: String)(implicit ecs: ECS): Future[Boolean] =
    for {
      user <- withSQL {
        select
          .from(User as u)
          .where
          .eq(u.username, username)
          .and(Some(u.active))
      }
        .map(User(u))
        .single
        .future

      result <- user.map(_.password == password)
    } yield result


  def token(user: User)(implicit ecs: ECS): Future[Token] = {
    val t = Token.syntax
    for {
      token <- withSQL {
        select
          .from(Token as t)
          .
      }
    }
  }


  override def save(model: User)(implicit ecs: ECS): Future[User] =
    for {
      _ <- withSQL {
        update(User)
          .set(
            column.username -> model.username,
            column.password -> model.password,
            column.active -> model.active
          )
          .where
          .eq(column.id, model.id)
      }
        .update
        .future

      user <- withSQL {
        select
          .from(User as u)
          .where
          .eq(u.id, model.id)
      }
        .map(User(u))
        .single
        .future

    } yield user.get

  override def destroy(model: User)(implicit ecs: ECS): Future[Unit] =
    for {
      _ <- withSQL {
        delete
          .from(User)
          .where
          .eq(column.id, model.id)
      }
        .update
        .future
    } yield ()

}