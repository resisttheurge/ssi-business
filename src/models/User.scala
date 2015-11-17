package models

import scalikejdbc._, async._, FutureImplicits._

import util._

import scala.concurrent._

case class User(id: Int,
                name: String,
                password: String)
  extends ShortenedNames {

  def roles()(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[List[Role]] =
    User.roles(this)(session, ec)

  def save()(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[User] =
    User.save(this)(session, ec)

  def destroy()(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Unit] =
    User.destroy(this)(session, ec)

}


object User extends SQLSyntaxSupport[User] with ShortenedNames {

  val u = User.syntax("u")
  override val tableName = "user"
  override val columns = Seq("id", "name", "password", "token")

  def roles(entity: User)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[List[Role]] =
    withSQL {
      select.from(UserRole as UserRole.ur)
        .leftJoin(Role as Role.r).on(UserRole.ur.roleId, Role.r.id)
        .where.eq(UserRole.ur.userId, entity.id)
    }
      .map(Role(Role.r))
      .list
      .future


  def apply(u: SyntaxProvider[User])(rs: WrappedResultSet): User =
    User(u.resultName)(rs)

  def apply(u: ResultName[User])(rs: WrappedResultSet): User =
    User(
      id = rs.get(u.id),
      name = rs.get(u.name),
      password = rs.get(u.password)
    )


  def find(id: Int)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Option[User]] =
    withSQL {
      select
        .from(User as u)
        .where.eq(u.id, id)
    }
      .map(User(u))
      .single
      .future


  def findAll()(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[List[User]] =
    withSQL {
      select
        .from(User as u)
    }
      .map(User(u))
      .list
      .future


  def countAll()(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Long] =
    for {
      count <- withSQL {
        select(sqls.count)
          .from(User as u)
      }
        .map(_.long(1))
        .single
        .future
    } yield count.get


  def findBy(where: SQLSyntax)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Option[User]] =
    withSQL {
      select
        .from(User as u)
        .where.append(where)
    }
      .map(User(u))
      .single
      .future


  def findAllBy(where: SQLSyntax)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[List[User]] =
    withSQL {
      select
        .from(User as u)
        .where.append(where)
    }
      .map(User(u.resultName))
      .list
      .future


  def countBy(where: SQLSyntax)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Long] =
    for {
      count <- withSQL {
        select(sqls.count)
          .from(User as u)
          .where.append(where)
      }
        .map(_.long(1))
        .single
        .future
    } yield count.get


  def create(name: String, password: String)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[User] =
    for {

      generatedKey <- withSQL {
        insert.into(User)
          .columns(
            column.name,
            column.password
          )
          .values(
            name,
            password
          )
      }
        .updateAndReturnGeneratedKey
        .future

      role <- User.find(generatedKey.toInt)

    } yield role.get

  def save(entity: User)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[User] =
    withSQL {
      update(User)
        .set(
          column.name -> entity.name,
          column.password -> entity.password
        )
        .where.eq(column.id, entity.id)
    }
      .update
      .future
      .replace(entity)


  def destroy(entity: User)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Unit] =
    withSQL {
      delete.from(User)
        .where.eq(column.id, entity.id)
    }
      .update
      .future
      .discard

}
