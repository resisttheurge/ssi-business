package app.models

import lib.model.Model
import lib.util.syntax.all._
import scalikejdbc._
import scalikejdbc.async._

import scala.concurrent.Future

case class User(id: Int, username: String, password: String, active: Boolean) extends Model[User]

object User extends Model.Companion[User] {

  override val tableName = "users"
  override val columns = Seq("id", "username", "password", "active")

  val u = syntax

  override def apply(u: ResultName[User])(rs: WrappedResultSet): User =
    User(
      id = rs.get(u.id),
      username = rs.get(u.username),
      password = rs.get(u.password),
      active = rs.get(u.active)
    )

}