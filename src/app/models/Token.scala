package app.models

import java.util.UUID

import lib.model._
import lib.util.syntax.all._
import org.joda.time.DateTime
import scalikejdbc._
import scalikejdbc.async._

import scala.concurrent.Future

case class Token(userId: Int, uuid: UUID, active: Boolean, expires: Option[DateTime]) extends Model[Token]

object Token extends Model.Companion[Token] {

  trait Exception extends RuntimeException

  case class CreationException(msg: String = "error creating token in database", cause: Option[Throwable] = None) extends Exception(msg) {
    cause match {
      case Some(thrown) => super.initCause(thrown)
      case _ =>
    }
  }

  override val tableName = "token"
  override val columns = Seq("user_id", "uuid", "active", "expires")

  val t = syntax

  override def apply(t: ResultName[Token])(rs: WrappedResultSet): Token =
    Token(
      userId = rs.get(t.userId),
      uuid = rs.get(t.uuid),
      active = rs.get(t.active),
      expires = rs.get(t.expires)
    )

  override def option(t: ResultName[Token])(rs: WrappedResultSet): Option[Token] =
    for {
      userId <- rs.intOpt(t.userId)
      uuid <- rs.stringOpt(t.uuid).map(UUID.fromString)
      active <- rs.booleanOpt(t.active)
    } yield Token(userId, uuid, active, rs.jodaDateTimeOpt(t.expires))

  def getByUUID(uuid: UUID)(implicit ecs: ECS): Future[Option[Token]] =
    withSQL {
      select
        .from(Token as t)
        .where
        .eq(t.uuid, uuid.toString)
    }
      .map(Token(t))
      .single
      .future

  def uuidAvailable(uuid: UUID)(implicit ecs: ECS): Future[Boolean] =
    getByUUID(uuid).map {
      case Some(_) => true
      case None => false
    }

  def create(userId: Int, uuid: UUID, active: Boolean = true, expires: Option[DateTime] = None)(implicit ecs: ECS): Future[Token] =
    for {

      available <- uuidAvailable(uuid)

      rows <- if (!available) {
        _insert(userId, uuid, active, expires)
      } else throw CreationException(s"given token uuid $uuid is already in database - check generation method")

      token <- if (rows == 1) {
        getByUUID(uuid)
      } else throw CreationException(s"query succeeded but no rows changed after inserting token uuid $uuid into database - check query")


    } yield token.get


  def _insert(userId: Int, uuid: UUID, active: Boolean = true, expires: Option[DateTime] = None)(implicit ecs: ECS): Future[Int] =
    withSQL {
      insert
        .into(Token)
        .namedValues(
          t.userId -> userId,
          t.uuid -> uuid,
          t.active -> active,
          t.expires -> expires
        )
    }
      .update
      .future


  override def save(model: Token)(implicit ecs: ECS): Future[Token] =
    for {
      rows <- _update(model)
      token <- getByUUID(model.uuid)
    } yield token.get


  def _update(token: Token)(implicit ecs: ECS): Future[Int] =
    withSQL {
      update(Token as t)
        .set(
          t.uuid -> token.uuid,
          t.active -> token.active,
          t.expires -> token.expires
        )
        .where
        .eq(t.userId, token.userId)
    }
      .update
      .future

  override def destroy(model: Token)(implicit ecs: ECS): Future[Unit] =
    for {
      rows <- _delete(model)
    } yield ()

  def _delete(token: Token)(implicit ecs: ECS): Future[Int] =
    withSQL {
      delete
        .from(Token as t)
        .where
        .eq(t.userId, token.userId)
    }
      .update
      .future
}
