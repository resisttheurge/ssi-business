package app.models

import lib.model.Model
import lib.util.syntax.all._
import scalikejdbc._
import scalikejdbc.async._

import scala.concurrent.Future

case class UserRole(userId: Int, roleId: Int, active: Boolean) extends Model[UserRole]

object UserRole extends Model.Companion[UserRole] {

  override val tableName = "user_roles"
  override val columns = Seq("user_id", "role_id", "active")

  val ur = syntax

  override def apply(ur: ResultName[UserRole])(rs: WrappedResultSet): UserRole =
    UserRole(
      userId = rs.get(ur.userId),
      roleId = rs.get(ur.roleId),
      active = rs.get(ur.active)
    )

}