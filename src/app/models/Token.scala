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

  override def save(model: Token)(implicit ecs: ECS): Future[Token] =
    for {
      _ <- withSQL {
        update(Token as t)
          .set(
            t.uuid -> model.uuid,
            t.active -> model.active,
            t.expires -> model.expires
          )
          .where
          .eq(t.userId, model.userId)
      }
        .update
        .future

      token <- withSQL {
        select
          .from(Token as t)
          .where
          .eq(t.userId, model.userId)
      }
        .map(Token(t))
        .single
        .future

    } yield token.get

  override def destroy(model: Token)(implicit ecs: ECS): Future[Unit] =
    for {
      _ <- withSQL {
        delete
          .from(Token as t)
          .where
          .eq(t.userId, model.userId)
      }
        .update
        .future
    } yield ()

}
