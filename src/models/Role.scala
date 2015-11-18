package models

import scalikejdbc._
import scalikejdbc.async._

import scala.concurrent._

case class Role(id: Int,
                name: String)
  extends Entity[Role]

object Role extends EntityCompanion[Role] {

  override val tableName = "role"
  override val columns = Seq("id", "name")

  val r = Role.syntax("r")

  override def apply(r: ResultName[Role])(rs: WrappedResultSet): Role =
    Role(
      id = rs.get(r.id),
      name = rs.get(r.name)
    )

  override def opt(r: ResultName[Role])(rs: WrappedResultSet): Option[Role] =
    for {
      id <- rs.intOpt(r.id)
      name <- rs.stringOpt(r.name)
    } yield Role(id, name)

  def by(id: Int)(implicit ecs: ECS): Future[Option[Role]] = byId(id)

  def by(name: String)(implicit ecs: ECS): Future[Option[Role]] = byName(name)

  def byId(id: Int)(implicit ecs: ECS): Future[Option[Role]] =
    for {
      role <- withSQL {
        select
          .from(Role as r)
          .where eq(r.id, id)
      }
        .map(Role(r))
        .single
        .future
    } yield role

  def byName(name: String)(implicit ecs: ECS): Future[Option[Role]] =
    for {
      role <- withSQL {
        select
          .from(Role as r)
          .where eq(r.name, name)
      }
        .map(Role(r))
        .single
        .future
    } yield role

  def create(name: String)(implicit ecs: ECS): Future[Role] =
    for {
      generatedKey <- withSQL {
        insert.into(Role)
          .columns(column.name)
          .values(name)
      }
        .updateAndReturnGeneratedKey
        .future

      role <- Role.by(generatedKey.toInt)

    } yield role.get


  override def save(entity: Role)(implicit ecs: ECS): Future[Role] =
    for {
      _ <- withSQL {
        update(Role)
          .set(
            column.name -> entity.name
          )
          .where.eq(column.id, entity.id)
      }
        .update
        .future

      role <- Role.by(entity.id)

    } yield role.get

  override def destroy(entity: Role)(implicit ecs: ECS): Future[Unit] =
    for {
      _ <- withSQL {
        delete.from(Role)
          .where.eq(column.id, entity.id)
      }
        .update
        .future
    } yield ()

}
