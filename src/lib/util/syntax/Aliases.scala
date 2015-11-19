package lib.util.syntax

import scalikejdbc.async.{AsyncDB, AsyncDBSession}

import scala.concurrent.ExecutionContext

trait Aliases {

  type EC = ExecutionContext
  type Session = AsyncDBSession

  type ECS = (EC, Session)

  val EC = ExecutionContext
  val DB = AsyncDB

  implicit def `ECS => EC`(implicit ecs: ECS): EC = ecs._1
  implicit def `ECS => Session`(implicit ecs: ECS): Session = ecs._2

}
