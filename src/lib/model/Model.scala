package lib.model

import lib.util.syntax.all._
import scalikejdbc.{DB => SyncDB, _}

import scala.concurrent._

abstract class Model[M <: Model[M]](implicit val companion: Model.Companion[M]) {
  this: M =>

  def defaultECS: ECS = companion.defaultECS

  def save()(implicit ecs: ECS = defaultECS): Future[M] = companion.save(this)
  def destroy()(implicit ecs: ECS = defaultECS): Future[Unit] = companion.destroy(this)

}

object Model {

  trait Companion[M <: Model[M]] extends SQLSyntaxSupport[M] {

    lazy val defaultECS: ECS = (EC.Implicits.global, DB.sharedSession)

    def apply(m: SyntaxProvider[M])(rs: WrappedResultSet): M = apply(m.resultName)(rs)
    def option(m: SyntaxProvider[M])(rs: WrappedResultSet): Option[M] = option(m.resultName)(rs)

    def apply(m: ResultName[M])(rs: WrappedResultSet): M
    def option(m: ResultName[M])(rs: WrappedResultSet): Option[M]

    def save(model: M)(implicit ecs: ECS = defaultECS): Future[M]
    def destroy(model: M)(implicit ecs: ECS = defaultECS): Future[Unit]

  }

}