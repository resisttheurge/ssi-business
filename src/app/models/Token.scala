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

  override val tableName = "tokens"
  override val columns = Seq("user_id", "uuid", "active", "expires")

  val t = syntax

  override def apply(t: ResultName[Token])(rs: WrappedResultSet): Token =
    Token(
      userId = rs.get(t.userId),
      uuid = rs.get(t.uuid),
      active = rs.get(t.active),
      expires = rs.get(t.expires)
    )

}
