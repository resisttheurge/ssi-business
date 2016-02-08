package com.cooksys.ssi.actor

import spray.routing.{HttpServiceActor, Route}

trait HttpActor extends HttpServiceActor with BaseActor {

  override def receive: Receive = runRoute(route)

  def route: Route

}
