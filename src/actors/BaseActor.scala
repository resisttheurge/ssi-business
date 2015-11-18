package actors

import akka.actor.{Actor, ActorLogging}
import com.typesafe.config.Config

trait BaseActor extends ActorLogging with utils.syntax.All {
  this: Actor =>

  implicit def config: Config

  def system = context.system

  implicit def dispatcher = context.dispatcher
}
