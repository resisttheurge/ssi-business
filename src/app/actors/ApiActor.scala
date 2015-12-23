package app.actors

import akka.actor.Props
import app.api._
import app.models._
import com.typesafe.config.Config
import lib.actor.{DB, Http}
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.json._
import spray.routing._

object ApiActor {
  def props(implicit config: Config): Props = Props(classOf[ApiActor], config)
}

case class ApiActor(config: Config) extends Http[ApiActor] with DB[ApiActor] {
  override def route: Route =
    pathPrefix("api") {
      CarrierApi().route ~
        CustomerApi().route ~
        JobApi().route ~
        ManufacturerApi().route ~
        PartApi().route ~
        SalespersonApi().route ~
        ShopApi().route ~
        VendorApi().route
    }
}
