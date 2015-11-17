package actors

import akka.actor.{Actor, ActorLogging}

trait BaseActor extends Actor with ActorLogging {
  implicit def system = context.system
  implicit def dispatcher = context.dispatcher
}
