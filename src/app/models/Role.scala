package app.models

import lib.model._
import lib.util.syntax.all._
import scalikejdbc._
import scalikejdbc.async._

import scala.concurrent.Future

case class Role(id: Int, title: String, active: Boolean = true) extends Model[Role]

object Role extends Model.Companion[Role] {

  override val tableName = "roles"
  override val columns = Seq("id", "title", "active")

  val r = syntax

  override def apply(r: ResultName[Role])(rs: WrappedResultSet): Role =
    Role(
      id = rs.get(r.id),
      title = rs.get(r.name),
      active = rs.get(r.active)
    )

}
