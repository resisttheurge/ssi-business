package com.cooksys.ssi

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import com.cooksys.ssi.route._
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

  val api =
    pathPrefix("api") {
      new AuthRoute ~
        new CarrierRoute ~
        new CustomerRoute ~
        new JobRoute ~
        new ManufacturerRoute ~
        new PartRoute ~
        new ReportRoute ~
        new SalespersonRoute ~
        new ShopRoute ~
        new SpecialtyItemRoute ~
        new SystemTypeRoute ~
        new UserRoute ~
        new VendorRoute
    }

  val bindingFuture = Http().bindAndHandle(api, "localhost", 80)

  println(s"Server online at http://localhost:80/\nPress RETURN to stop...")
  //  StdIn.readLine() // for the future transformations
  //  bindingFuture
  //    .flatMap(_.unbind()) // trigger unbinding from the port
  //    .onComplete(_ ⇒ system.shutdown()) // and shutdown when done


}
