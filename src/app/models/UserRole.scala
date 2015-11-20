package app.models

import lib.model.Model
import lib.util.syntax.all._
import scalikejdbc._
import scalikejdbc.async._

import scala.concurrent.Future

case class UserRole(userId: Int, roleId: Int, active: Boolean) extends Model[UserRole]

object UserRole extends Model.Companion[UserRole] {

  override val tableName = "user_role"
  override val columns = Seq("user_id", "role_id", "active")

  val ur = syntax

  override def apply(ur: ResultName[UserRole])(rs: WrappedResultSet): UserRole =
    UserRole(
      userId = rs.get(ur.userId),
      roleId = rs.get(ur.roleId),
      active = rs.get(ur.active)
    )

  override def option(ur: ResultName[UserRole])(rs: WrappedResultSet): Option[UserRole] =
    for {
      userId <- rs.intOpt(ur.userId)
      roleId <- rs.intOpt(ur.roleId)
      active <- rs.booleanOpt(ur.active)
    } yield UserRole(userId, roleId, active)

  override def save(model: UserRole)(implicit ecs: ECS): Future[UserRole] =
    for {
      _ <- withSQL {
        update(UserRole as ur)
          .set(
            ur.active -> model.active
          )
          .where
          .eq(ur.userId, model.userId)
          .and
          .eq(ur.roleId, model.roleId)
      }
        .update
        .future

      userRole <- withSQL {
        select.from(UserRole as ur)
          .where
          .eq(ur.userId, model.userId)
          .and
          .eq(ur.roleId, model.roleId)
      }
        .map(UserRole(ur))
        .single
        .future

    } yield userRole.get

  override def destroy(model: UserRole)(implicit ecs: ECS): Future[Unit] =
    for {
      _ <- withSQL {
        delete
          .from(UserRole as ur)
          .where
          .eq(ur.userId, model.userId)
          .and
          .eq(ur.roleId, model.roleId)
      }
        .update
        .future
    } yield ()

}