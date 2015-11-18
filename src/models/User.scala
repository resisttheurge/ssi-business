package models

import scalikejdbc._
import scalikejdbc.async._

import scala.concurrent._

case class User(id: Int, username: String, password: String) extends Entity[User] {

  def token()(implicit ecs: ECS) = User.token(this)

}

object User extends EntityCompanion[User] {

  override val tableName = "user"
  override val columns = Seq("id", "name", "password")

  val (u, t) = (User.syntax, Token.syntax)

  def token(user: User)(implicit ecs: ECS) =
    for {
      token <- Token.by(user.id)
    } yield token

  override def apply(u: ResultName[User])(rs: WrappedResultSet): User =
    User(
      id = rs.get(u.id),
      username = rs.get(u.username),
      password = rs.get(u.password)
    )

  override def opt(u: ResultName[User])(rs: WrappedResultSet): Option[User] =
    for {
      id <- rs.intOpt(u.id)
      username <- rs.stringOpt(u.username)
      password <- rs.stringOpt(u.password)
    } yield User(id, username, password)

  def by(id: Int)(implicit ecs: ECS): Future[Option[User]] = byId(id)

  def by(username: String)(implicit ecs: ECS): Future[Option[User]] = byUsername(username)

  def byId(id: Int)(implicit ecs: ECS): Future[Option[User]] =
    for {
      user <- withSQL {
        select
          .from(User as u)
          .where.eq(u.id, id)
      }
        .map(User(u))
        .single
        .future
    } yield user

  def byUsername(username: String)(implicit ecs: ECS): Future[Option[User]] =
    for {
      user <- withSQL {
        select
          .from(User as u)
          .where.eq(u.username, username)
      }
        .map(User(u))
        .single
        .future
    } yield user

  def create(username: String, password: String)(implicit ecs: ECS): Future[User] =
    for {
      generatedKey <- withSQL {
        insert.into(User)
          .columns(column.username)
          .values(username)
      }
        .updateAndReturnGeneratedKey
        .future

      user <- User.by(generatedKey.toInt)

    } yield user.get


  override def save(entity: User)(implicit ecs: ECS): Future[User] =
    for {
      _ <- withSQL {
        update(User)
          .set(
            column.username -> entity.username,
            column.password -> entity.password
          )
          .where.eq(column.id, entity.id)
      }
        .update
        .future

      user <- User.by(entity.id)

    } yield user.get


  override def destroy(entity: User)(implicit ecs: ECS): Future[Unit] =
    for {
      _ <- withSQL {
        delete.from(User)
          .where.eq(column.id, entity.id)
      }
        .update
        .future
    } yield ()
}
