package com.cooksys.ssi.actor

import spray.routing.{HttpServiceActor, Route}

trait HttpActor extends HttpServiceActor with BaseActor {

  def route: Route

  override def receive: Receive = runRoute(route)

}
