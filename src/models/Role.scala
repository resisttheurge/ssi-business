package models

import scalikejdbc._, async._, FutureImplicits._

import util._

import scala.concurrent._

case class Role(id: Int, name: String) extends ShortenedNames {

  def save()(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Role] =
    Role.save(this)(session, ec)

  def destroy()(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal ): Future[Unit] =
    Role.destroy(this)(session, ec)

}

object Role extends SQLSyntaxSupport[Role] with ShortenedNames {

  override val tableName = "role"
  override val columns = Seq("id", "name")

  val r = Role.syntax("r")

  def apply(r: SyntaxProvider[Role])(rs: WrappedResultSet): Role =
    Role(r.resultName)(rs)

  def apply(r: ResultName[Role])(rs: WrappedResultSet): Role =
    Role(id = rs.get(r.id), name = rs.get(r.name))

  def find(id: Int)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Option[Role]] =
    withSQL {
      select
        .from(Role as r)
        .where.eq(r.id, id)
    }
      .map(Role(r))
      .single
      .future


  def findAll()(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[List[Role]] =
    withSQL {
      select
        .from(Role as r)
    }
      .map(Role(r))
      .list
      .future


  def countAll()(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Long] =
    for {
      count <- withSQL {
        select(sqls.count)
          .from(Role as r)
      }
        .map(_.long(1))
        .single
        .future
    } yield count.get


  def findBy(where: SQLSyntax)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Option[Role]] =
    withSQL {
      select
        .from(Role as r)
        .where.append(where)
    }
      .map(Role(r))
      .single
      .future


  def findAllBy(where: SQLSyntax)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[List[Role]] =
    withSQL {
      select
        .from(Role as r)
        .where.append(where)
    }
      .map(Role(r.resultName))
      .list
      .future


  def countBy(where: SQLSyntax)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Long] =
    for {
      count <- withSQL {
        select(sqls.count)
          .from(Role as r)
          .where.append(where)
      }
        .map(_.long(1))
        .single
        .future
    } yield count.get


  def create(name: String)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Role] =
    for {
      generatedKey <- withSQL {
        insert.into(Role)
          .columns(column.name)
          .values(name)
      }
        .updateAndReturnGeneratedKey
        .future

      role <- Role.find(generatedKey.toInt)

    } yield role.get

  def save(entity: Role)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Role] =
    withSQL {
      update(Role)
        .set(
          column.name -> entity.name
        )
        .where.eq(column.id, entity.id)
    }
      .update
      .future
      .replace(entity)


  def destroy(entity: Role)(implicit session: AsyncDBSession = AsyncDB.sharedSession, ec: EC = ECGlobal): Future[Unit] =
    withSQL {
      delete.from(Role)
        .where.eq(column.id, entity.id)
    }
      .update
      .future
      .discard

}
