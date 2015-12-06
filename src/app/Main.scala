package app

import app.actors.ServerActor
import properties.server
import akka.actor.ActorSystem
import akka.io.IO
import akka.util.Timeout
import com.typesafe.config.ConfigFactory
import org.slf4j.LoggerFactory
import spray.can.Http
import akka.pattern._

import scala.concurrent.duration._
import scala.util.{Failure, Success}

trait Main {

  implicit lazy val log = LoggerFactory.getLogger("server")

  implicit lazy val config = ConfigFactory.load()
  implicit lazy val system = ActorSystem("ssi-business-server", config)
  implicit lazy val dispatcher = system.dispatcher

  def start(): Unit =
    try {

      log.info("obtaining server actor reference...")
      val serverActor =
        system.actorOf(ServerActor.props, "server-actor")

      log.info("binding server actor reference to http...")
      val message = (
        IO(Http) ?
          Http.Bind(
            serverActor,
            interface = server.http.bind.interface(),
            port = server.http.bind.port()
          )
        ) (server.http.bind.timeout().milliseconds)

      log.info("awaiting bound confirmation...")
      message
        .map {
          case msg: Http.Bound => msg
          case msg => throw new RuntimeException(s"unexpected message received during http binding: $msg")
        }
        .onComplete {
          case Success(_: Http.Bound) =>
            log.info("server actor bound successfully!")
            awaitTermination()

          case Failure(t: Throwable) =>
            log.error("server encountered error during http binding", t)
            shutdown()
        }

    } catch {
      case t: Throwable =>
        log.error("server encountered error during startup", t)
        shutdown()
    }


  def awaitTermination(): Unit = {
    log.info("awaiting system termination...")
    system.awaitTermination()
  }

  def shutdown(): Unit = {
    log.info("shutting down server...")
    awaitTermination()
  }

}
