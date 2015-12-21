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

  lazy val carriers = new CarrierApi
  lazy val customers = new CustomerApi
  lazy val manufacturers = new ManufacturerApi
  lazy val parts = new PartApi
  lazy val salespeople = new SalespersonApi
  lazy val shops = new ShopApi
  lazy val vendors = new VendorApi

  override def route: Route =
    pathPrefix("api") {
      carriers.route ~ customers.route ~ manufacturers.route ~ parts.route ~ salespeople.route ~ shops.route ~ vendors.route
    }
}
