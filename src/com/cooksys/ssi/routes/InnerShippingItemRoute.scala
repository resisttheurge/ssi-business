package com.cooksys.ssi.routes

import akka.http.scaladsl.server.Route
import com.cooksys.ssi.dao.ShippingItemZoneDao
import slick.driver.MySQLDriver.api._

import scala.concurrent.ExecutionContext

case class InnerShippingItemRoute(id: Int)(implicit db: Database, ec: ExecutionContext) extends BaseRoute {
  override def internal: Route =
    pathPrefix("zones") {
      pathEndOrSingleSlash {
        get {
          ShippingItemZoneDao.indexByShippingItemId(id)
        }
      }
    }
}
