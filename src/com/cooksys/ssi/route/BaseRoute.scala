package com.cooksys.ssi.route

import spray.routing.{Directives, RequestContext, Route}

trait BaseRoute extends Route with Directives {

  override def apply(rc: RequestContext): Unit = internal(rc)

  def internal: Route

}
