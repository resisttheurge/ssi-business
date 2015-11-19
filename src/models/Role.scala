package models

import lib.model._
import scalikejdbc._

case class Role(id: Int, name: String, active: Boolean) extends Model.Of(Role)

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

  override def opt(r: ResultName[Role])(rs: WrappedResultSet): Option[Role] =
    for {
      id <- rs.intOpt(r.id)
      name <- rs.stringOpt(r.name)
      active <- rs.booleanOpt(r.active)
    } yield Role(id, name, active)

}
