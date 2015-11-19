package lib.actor

import akka.actor.{Actor, ActorLogging}
import com.typesafe.config.Config

trait Base[B <: Base[B]] extends Actor with ActorLogging {
  this: B =>

  implicit def config: Config

  implicit def system = context.system

  implicit def dispatcher = context.dispatcher

}
