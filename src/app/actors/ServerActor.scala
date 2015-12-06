package app.actors

import java.io.File

import akka.actor.Props
import app.properties._
import com.typesafe.config.Config
import lib.actor.Http

object ServerActor {
  def props(implicit config: Config) = Props(classOf[ServerActor], config)
}

case class ServerActor(config: Config) extends Http[ServerActor] {

  override def route =
    pathEndOrSingleSlash {
      getFromResource(s"${server.cwd()}${File.separator}index.html")

    } ~ pathPrefix("assets") {
      getFromResourceDirectory(s"${server.cwd()}${File.separator}assets")

    }

}
