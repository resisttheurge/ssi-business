package com.cooksys.ssi.route

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.marshalling._
import akka.http.scaladsl.server._

import scala.concurrent.{ExecutionContext, Future}

trait BaseRoute extends Route with Directives with SprayJsonSupport {

  implicit def unwrapFuture[T : ToResponseMarshaller](future: => Future[T])(implicit ec: ExecutionContext) =
    complete(future)

  override def apply(rc: RequestContext): Future[RouteResult] = internal(rc)

  def internal: Route

}
