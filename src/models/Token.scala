package models

import java.util.UUID
import org.joda.time.DateTime
import scalikejdbc._
import scalikejdbc.async._

import scala.concurrent._

case class Token(userId: Int,
                 uuid: UUID,
                 expires: DateTime)
  extends Entity[Token]

object Token extends EntityCompanion[Token] {

  override val tableName = "token"
  override val columns = Seq("user_id", "uuid", "expires")

  val t = Token.syntax

  override def apply(t: ResultName[Token])(rs: WrappedResultSet): Token =
    Token(
      userId = rs.get(t.userId),
      uuid = rs.get(t.uuid),
      expires = rs.get(t.expires)
    )

  override def opt(t: ResultName[Token])(rs: WrappedResultSet): Option[Token] =
    for {
      userId <- rs.intOpt(t.userId)
      uuid <- rs.stringOpt(t.uuid).map(UUID.fromString)
      expires <- rs.jodaDateTimeOpt(t.expires)
    } yield Token(userId, uuid, expires)

  def by(userId: Int)(implicit ecs: ECS) = byId(userId)

  def by(uuid: String)(implicit ecs: ECS) = byUUIDString(uuid)

  def by(uuid: UUID)(implicit ecs: ECS) = byUUID(uuid)

  def byId(userId: Int)(implicit ecs: ECS) =
    for {
      token <- withSQL {
        select
          .from(Token as t)
          .where.eq(t.userId, userId)
      }
        .map(Token(t))
        .single
        .future
    } yield token

  def byUUIDString(uuid: String)(implicit ecs: ECS) =
    for {
      token <- withSQL {
        select
          .from(Token as t)
          .where.eq(t.uuid, uuid)
      }
        .map(Token(t))
        .single
        .future
    } yield token

  def byUUID(uuid: UUID)(implicit ecs: ECS) = byUUIDString(uuid.toString)

  def create(userId: Int, uuid: String, expires: DateTime)(implicit ecs: ECS): Future[Token] =
    for {
      _ <- withSQL {
        insert
          .into(Token)
          .columns(
            t.userId,
            t.uuid,
            t.expires
          )
          .values(
            userId,
            uuid,
            expires
          )
      }
        .update
        .future

      token <- Token.by(userId)

    } yield token.get

  override def destroy(entity: Token)(implicit ecs: ECS): Future[Unit] =
    for {
      _ <- withSQL {
        delete
          .from(Token as t)
          .where.eq(t.userId, entity.userId)
      }
        .update
        .future

    } yield ()

  override def save(entity: Token)(implicit ecs: ECS): Future[Token] =
    for {
      _ <- withSQL {
        update(Token as t)
          .set(
            t.uuid -> entity.uuid,
            t.expires -> entity.expires
          )
          .where.eq(t.userId, entity.userId)
      }
        .update
        .future

      token <- Token.by(entity.userId)

    } yield token.get


}