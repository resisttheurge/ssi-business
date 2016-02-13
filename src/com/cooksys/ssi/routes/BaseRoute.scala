package com.cooksys.ssi.routes

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.marshalling._
import akka.http.scaladsl.server._
import com.cooksys.ssi.json.JsonProtocol
import com.cooksys.ssi.utils.AllUtilities
import spray.json.{RootJsonFormat, JsonFormat}

import scala.concurrent.{ExecutionContext, Future}

trait BaseRoute
  extends Route
    with Directives
    with SprayJsonSupport
    with JsonProtocol
    with AllUtilities {

  implicit def unwrapRootJsonFormatFuture[T : RootJsonFormat](future: => Future[T])(implicit ec: ExecutionContext) =
    complete(future)

  override def apply(rc: RequestContext): Future[RouteResult] = internal(rc)

  def internal: Route

}
