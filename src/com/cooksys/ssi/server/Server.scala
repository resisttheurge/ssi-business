package com.cooksys.ssi.server

import akka.actor.ActorSystem
import akka.pattern._
import akka.util.Timeout
import com.cooksys.ssi.properties
import com.typesafe.config.ConfigFactory
import org.slf4j.LoggerFactory

import scala.concurrent.duration._
import scala.util.{Failure, Success}

trait Server {

  implicit lazy val log =
    LoggerFactory.getLogger("server")

  implicit lazy val config = {
    log.debug("loading configuration")
    ConfigFactory.load()
  }

  implicit lazy val system = {
    log.debug("initializing actor system")
    ActorSystem("ssi-business-server", config)
  }

  implicit lazy val dispatcher = {
    log.debug("obtaining actor system dispatcher")
    system.dispatcher
  }

  implicit lazy val timeout: Timeout = {
    log.debug("obtaining server timeout value")
    properties.server.timeout().milliseconds
  }

  lazy val  serverActor = {
    log.debug("obtaining server actor reference")
    system.actorOf(ServerActor.props)
  }

  def run(): Unit = {
    log.info("starting server")
    (serverActor ? "bind").onComplete {
      case Success("bound") =>
        log.debug("server started")
      case Success(msg) =>
        log.warn(s"received unexpected message during server startup: $msg")
      case Failure(t) =>
        log.error("error encountered during server startup", t)
        shutdown()
    }
    log.debug("server running")
    await()
  }

  def shutdown(): Unit = {
    log.info("shutting down server")
    system.shutdown()
    log.debug("awaiting system termination")
    await()
  }

  def await(): Unit = system.awaitTermination()


}
