package lib.actor

import spray.routing.{Route, HttpServiceActor}

trait Http[+This <: Http[This]] extends HttpServiceActor with Base[This] {
  this: This =>

  def route: Route

  override def receive: Receive = runRoute(route)

}
