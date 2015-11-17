package actors

import java.io.File

import akka.actor.{Actor, Props}
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
