package com.cooksys.ssi.routes

import akka.http.scaladsl.server.Route
import com.cooksys.ssi.dao.ShipmentItemDao
import slick.driver.MySQLDriver.api._

import scala.concurrent.ExecutionContext

case class InnerShipmentRoute(id: Int)(implicit db: Database, ec: ExecutionContext) extends BaseRoute {
  override def internal: Route =
    pathPrefix("items") {
      pathEndOrSingleSlash {
        get {
          ShipmentItemDao.indexByShipmentId(id)
        }
      }
    }
}
