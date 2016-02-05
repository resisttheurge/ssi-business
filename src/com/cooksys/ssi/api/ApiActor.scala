package com.cooksys.ssi.api

import akka.actor.{ActorRef, Props}
import com.cooksys.ssi.actor.HttpActor
import spray.routing.Route

object ApiActor {
  def props(model: ActorRef): Props = Props(classOf[ApiActor], model)
}

class ApiActor(model: ActorRef) extends HttpActor {

  override def route: Route = ???

}
