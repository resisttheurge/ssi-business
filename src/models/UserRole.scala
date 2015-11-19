package models

import lib.model.{Companion, Model}
import scalikejdbc._
import scalikejdbc.async._

import scala.concurrent._

case class UserRole(userId: Int,
                    roleId: Int)
  extends Model[UserRole]

object UserRole extends Companion[UserRole] {

  override val tableName = "user_role"
  override val columns = Seq("userId", "roleId")

  val ur = UserRole.syntax("ur")

  override def apply(ur: ResultName[UserRole])(rs: WrappedResultSet): UserRole =
    UserRole(
      userId = rs.get(ur.userId),
      roleId = rs.get(ur.roleId)
    )

  override def opt(ur: ResultName[UserRole])(rs: WrappedResultSet): Option[UserRole] =
    for {
      userId <- rs.intOpt(ur.userId)
      roleId <- rs.intOpt(ur.roleId)
    } yield UserRole(userId, roleId)

  def by(userId: Int, roleId: Int)(implicit ecs: ECS) = byUserIdAndRoleId(userId, roleId)

  def by(user: User, role: Role)(implicit ecs: ECS) = byUserIdAndRoleId(user.id, role.id)

  def by(user: User)(implicit ecs: ECS) = byUserId(user.id)

  def by(role: Role)(implicit ecs: ECS) = byRoleId(role.id)

  def byUserIdAndRoleId(userId: Int, roleId: Int)(implicit ecs: ECS): Future[Option[UserRole]] =
    for {
      userRole <- withSQL {
        select
          .from(UserRole as ur)
          .where.eq(ur.userId, userId)
          .and.eq(ur.roleId, roleId)
      }
        .map(UserRole(ur))
        .single
        .future
    } yield userRole

  def byUserId(userId: Int)(implicit ecs: ECS): Future[List[UserRole]] =
    for {
      userRoles <- withSQL {
        select
          .from(UserRole as ur)
          .where.eq(ur.userId, userId)
      }
        .map(UserRole(ur))
        .list
        .future
    } yield userRoles

  def byRoleId(roleId: Int)(implicit ecs: ECS): Future[List[UserRole]] =
    for {
      userRoles <- withSQL {
        select
          .from(UserRole as ur)
          .where.eq(ur.roleId, roleId)
      }
        .map(UserRole(ur))
        .list
        .future
    } yield userRoles

  def createByUserIdAndRoleId(userId: Int, roleId: Int)(implicit ecs: ECS): Future[UserRole] =
    for {
      _ <- withSQL {
        insert.into(UserRole)
          .columns(
            column.userId,
            column.roleId
          )
          .values(
            userId,
            roleId
          )
      }
        .update
        .future

      userRole <- UserRole.by(userId, roleId)

    } yield userRole.get


  override def save(entity: UserRole)(implicit ecs: ECS): Future[UserRole] =
    for {
      _ <- withSQL {
        update(UserRole)
          .set(
            column.userId -> entity.userId,
            column.roleId -> entity.roleId
          )
          .where.eq(column.userId, entity.userId)
          .and.eq(column.roleId, entity.roleId)
      }
        .update
        .future

      userRole <- UserRole.by(entity.userId, entity.roleId)
    } yield userRole.get


  override def destroy(entity: UserRole)(implicit ecs: ECS): Future[Unit] =
    for {
      _ <- withSQL {
        delete.from(UserRole)
          .where.eq(column.roleId, entity.userId)
          .and.eq(column.roleId, entity.roleId)
      }
        .update
        .future
    } yield ()

}
