package lib.model

import lib.util.syntax.all._
import scalikejdbc.{DB => SyncDB, _}

import scala.concurrent._

abstract class Model[M <: Model[M]](implicit val companion: Model.Companion[M]) {
  this: M =>

  def defaultECS: ECS = companion.defaultECS

}

object Model {

  trait Companion[M <: Model[M]] extends SQLSyntaxSupport[M] {

    lazy val defaultECS: ECS = (EC.Implicits.global, DB.sharedSession)

    def apply(m: SyntaxProvider[M])(rs: WrappedResultSet): M = apply(m.resultName)(rs)

    def apply(m: ResultName[M])(rs: WrappedResultSet): M

  }

}