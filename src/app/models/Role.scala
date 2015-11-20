package app.models

import lib.model._
import lib.util.syntax.all._
import scalikejdbc._
import scalikejdbc.async._

import scala.concurrent.Future

case class Role(id: Int, name: String, active: Boolean) extends Model[Role]

object Role extends Model.Companion[Role] {

  override val tableName = "role"
  override val columns = Seq("id", "name", "active")

  val r = syntax

  override def apply(r: ResultName[Role])(rs: WrappedResultSet): Role =
    Role(
      id = rs.get(r.id),
      name = rs.get(r.name),
      active = rs.get(r.active)
    )

  override def option(r: ResultName[Role])(rs: WrappedResultSet): Option[Role] =
    for {
      id <- rs.intOpt(r.id)
      name <- rs.stringOpt(r.name)
      active <- rs.booleanOpt(r.active)
    } yield Role(id, name, active)

  override def save(model: Role)(implicit ecs: ECS): Future[Role] =
    for {
      _ <- withSQL {
        update(Role as r)
          .set(
            r.name -> model.name,
            r.active -> model.active
          )
          .where
          .eq(r.id, model.id)
      }
        .update
        .future

      role <- withSQL {
        select
          .from(Role as r)
          .where
          .eq(r.id, model.id)
      }
        .map(Role(r))
        .single
        .future

    } yield role.get

  override def destroy(model: Role)(implicit ecs: ECS): Future[Unit] =
    for {
      _ <- withSQL {
        delete
          .from(Role as r)
          .where
          .eq(r.id, model.id)
      }
        .update
        .future
    } yield ()

}
