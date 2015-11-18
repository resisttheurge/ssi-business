package actors

import java.io.File

import akka.actor.{Actor, Props}
import com.typesafe.config.Config
import properties._
import spray.routing._

object ServerActor {
  def props(implicit config: Config) = Props(classOf[ServerActor], config)
}

case class ServerActor(config: Config) extends HttpServiceActor with BaseActor {

  override def receive: Actor.Receive =
    runRoute {

      path("") {
        getFromResource(s"${server.cwd()}${File.separator}index.html")

      } ~ pathPrefix("assets") {
        getFromResourceDirectory(s"${server.cwd()}${File.separator}assets")

      }

    }

}
