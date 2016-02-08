package com.cooksys.ssi.route

import spray.httpx.SprayJsonSupport
import spray.httpx.marshalling.{Marshaller, ToResponseMarshallable}
import spray.routing.{Directives, RequestContext, Route}

import scala.concurrent.{ExecutionContext, Future}

trait BaseRoute extends Route with Directives with SprayJsonSupport {

  implicit def unwrapFuture[T : Marshaller](future: => Future[T])(implicit ec: ExecutionContext): Route =
    onSuccess(future) { t: T => complete(t) }

  override def apply(rc: RequestContext): Unit = internal(rc)

  def internal: Route

}
