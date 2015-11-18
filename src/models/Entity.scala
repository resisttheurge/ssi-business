package models

import scala.concurrent._

abstract class Entity[E <: Entity[E]](implicit val companion: EntityCompanion[E]) extends utils.syntax.All {
  this: E =>

  def defaultECS: ECS = companion.defaultECS

  def save()(implicit ecs: ECS = defaultECS): Future[E] = companion.save(this)
  def destroy()(implicit ecs: ECS = defaultECS): Future[Unit] = companion.destroy(this)

}
