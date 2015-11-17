package models

import scalikejdbc._, async._, FutureImplicits._

import util._

import scala.concurrent._

case class UserRole(userId: Int,
                   roleId: Int)
  extends ShortenedNames {

  def destroy()(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Unit] =
    UserRole.destroy(this)(session, ec)

}


object UserRole extends SQLSyntaxSupport[UserRole] with ShortenedNames {

  val ur = UserRole.syntax("ur")
  override val tableName = "user_role"
  override val columns = Seq("user_id", "role_id")


  def apply(u: SyntaxProvider[UserRole])(rs: WrappedResultSet): UserRole =
    UserRole(u.resultName)(rs)

  def apply(u: ResultName[UserRole])(rs: WrappedResultSet): UserRole =
    UserRole(
      userId = rs.get(u.userId),
      roleId = rs.get(u.roleId)
    )


  def find(userId: Int, roleId: Int)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Option[UserRole]] =
    withSQL {
      select
        .from(UserRole as ur)
        .where.eq(ur.userId, userId)
        .and.eq(ur.roleId, roleId)
    }
      .map(UserRole(ur))
      .single
      .future


  def findAll()(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[List[UserRole]] =
    withSQL {
      select
        .from(UserRole as ur)
    }
      .map(UserRole(ur))
      .list
      .future


  def countAll()(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Long] =
    for {
      count <- withSQL {
        select(sqls.count)
          .from(UserRole as ur)
      }
        .map(_.long(1))
        .single
        .future
    } yield count.get


  def findBy(where: SQLSyntax)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Option[UserRole]] =
    withSQL {
      select
        .from(UserRole as ur)
        .where.append(where)
    }
      .map(UserRole(ur))
      .single
      .future


  def findAllBy(where: SQLSyntax)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[List[UserRole]] =
    withSQL {
      select
        .from(UserRole as ur)
        .where.append(where)
    }
      .map(UserRole(ur.resultName))
      .list
      .future


  def countBy(where: SQLSyntax)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Long] =
    for {
      count <- withSQL {
        select(sqls.count)
          .from(UserRole as ur)
          .where.append(where)
      }
        .map(_.long(1))
        .single
        .future
    } yield count.get


  def create(userId: Int, roleId: Int)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[UserRole] =
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

      role <- UserRole.find(userId, roleId)

    } yield role.get


  def destroy(entity: UserRole)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Unit] =
    withSQL {
      delete.from(UserRole)
        .where.eq(ur.userId, entity.userId)
        .and.eq(ur.roleId, entity.roleId)
    }
      .update
      .future
      .discard

}
