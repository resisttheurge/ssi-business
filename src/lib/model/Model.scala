package lib.model

import lib.util.syntax.all._
import scalikejdbc.{DB => SyncDB, _}

import scala.concurrent._

trait Model[M <: Model[M]] {
  this: M =>

  def save()(implicit ecs: ECS): Future[M]

  def delete()(implicit ecs: ECS): Future[Unit]

}

object Model {

  trait Companion[M <: Model[M]] extends SQLSyntaxSupport[M] {

    lazy val defaultECS: ECS = (EC.Implicits.global, DB.sharedSession)

    def apply(m: SyntaxProvider[M])(rs: WrappedResultSet): M = apply(m.resultName)(rs)
    def option(m: SyntaxProvider[M])(rs: WrappedResultSet): Option[M] = option(m.resultName)(rs)

    def apply(m: ResultName[M])(rs: WrappedResultSet): M
    def option(m: ResultName[M])(rs: WrappedResultSet): Option[M]

    def create(magnet: Create[M])(implicit ecs: ECS = defaultECS): Future[M]
    def read(magnet: Read[M])(implicit ecs: ECS = defaultECS): Future[Option[M]]
    def readList(magnet: ReadList[M])(implicit ecs: ECS = defaultECS): Future[Option[M]]
    def update(magnet: Update[M])(implicit ecs: ECS = defaultECS): Future[M]
    def delete(magnet: Delete[M])(implicit ecs: ECS = defaultECS): Future[()]

  }

  abstract class Of[O <: Of[O]](val companion: Companion[O]) extends Model[O] {
    this: O =>

    def defaultECS: ECS = companion.defaultECS

    override def save()(implicit ecs: ECS = defaultECS): Future[O] = companion.save(this)

    override def delete()(implicit ecs: ECS = defaultECS): Future[Unit] = companion.delete(this)

  }

}