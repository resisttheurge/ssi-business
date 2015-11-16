package com.cooksys.ssi.business.actor

import java.io.File

import akka.actor.{Props, Actor}
import com.cooksys.ssi.business.properties._
import spray.routing._

object ServerActor {
  def props = Props(classOf[ServerActor])
}

class ServerActor extends HttpServiceActor with BaseActor {

  override def receive: Actor.Receive =
    runRoute {

      path("") {
        getFromResource(s"${server.cwd()}${File.separator}index.html")

      } ~ pathPrefix("assets") {
        getFromResourceDirectory(s"${server.cwd()}${File.separator}assets")

      }

    }

}
