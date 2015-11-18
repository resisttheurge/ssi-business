package models

import scalikejdbc._

import scala.concurrent._

trait EntityCompanion[E <: Entity[E]] extends SQLSyntaxSupport[E] with utils.syntax.All {

  def defaultECS: ECS = (EC.Implicits.global, DB.sharedSession)

  def apply(e: ResultName[E])(rs: WrappedResultSet): E

  def apply(e: SyntaxProvider[E])(rs: WrappedResultSet): E = apply(e.resultName)(rs)

  def opt(e: ResultName[E])(rs: WrappedResultSet): Option[E]

  def opt(e: SyntaxProvider[E])(rs: WrappedResultSet): Option[E] = opt(e.resultName)(rs)

  def save(entity: E)(implicit ecs: ECS = defaultECS): Future[E]

  def destroy(entity: E)(implicit ecs: ECS = defaultECS): Future[Unit]

}
