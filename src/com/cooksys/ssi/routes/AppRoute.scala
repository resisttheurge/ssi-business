package com.cooksys.ssi.routes

import java.io.File

import akka.http.scaladsl.server.Route

object AppRoute extends BaseRoute {
  override def internal: Route =
    getFromResourceDirectory("app") ~ getFromResource("app/index.html")
}
