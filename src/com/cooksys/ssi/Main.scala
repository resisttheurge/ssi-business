package com.cooksys.ssi

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import com.cooksys.ssi.dao._
import com.cooksys.ssi.routes._
import com.typesafe.config.ConfigFactory
import org.slf4j.LoggerFactory
import slick.driver.MySQLDriver.api._

object Main extends App {

  implicit val log = LoggerFactory.getLogger("server")

  implicit val config = ConfigFactory.load()
  implicit val db = Database.forConfig(properties.database.default(), config)

  implicit val system = ActorSystem("ssi-business-server")
  implicit val dispatcher = system.dispatcher
  implicit val materializer = ActorMaterializer()

  val bindingFuture = Http().bindAndHandle(ApiRoute("api") ~ AppRoute, properties.bind.interface(), properties.bind.port())

  log.info(s"Server online.")

}
