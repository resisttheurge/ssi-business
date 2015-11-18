package actors

import akka.actor.{Actor, ActorLogging}
import com.typesafe.config.Config

trait BaseActor extends Actor with ActorLogging {
  implicit def config: Config
  implicit def system = context.system
  implicit def dispatcher = context.dispatcher
}
