package com.cooksys.ssi.server

import akka.actor.{ActorRef, Props}
import akka.io.IO
import com.cooksys.ssi.actor.BaseActor
import com.cooksys.ssi.api.ApiActor
import com.cooksys.ssi.model.ModelActor
import com.cooksys.ssi.properties
import spray.can.Http

object ServerActor {
  def props: Props = Props(classOf[ServerActor])
}

class ServerActor extends BaseActor {

  var binder: ActorRef = null

  lazy val api: ActorRef = context.actorOf(ApiActor.props(model))
  lazy val model: ActorRef = context.actorOf(ModelActor.props)

  override def receive: Receive = {

    case "bind" =>
      binder = sender
      IO(Http) ! Http.Bind(
        api,
        properties.bind.interface(),
        properties.bind.port()
      )

    case _: Http.Bound =>
      binder ! "bound"

  }

}
