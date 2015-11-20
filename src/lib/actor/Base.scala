package lib.actor

import akka.actor.{Actor, ActorLogging}
import com.typesafe.config.Config

trait Base[+This <: Base[This]] extends Actor with ActorLogging {
  this: This =>

  implicit def config: Config

  implicit def system = context.system

  implicit def dispatcher = context.dispatcher

}
