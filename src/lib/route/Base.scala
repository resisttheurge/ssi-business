package lib.route

import spray.routing.{Directives, RequestContext, Route}

trait Base extends Route with Directives {

  override def apply(rc: RequestContext): Unit = route(rc)

  def route: Route

}
