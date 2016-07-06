package com.cooksys.ssi.routes

import akka.http.scaladsl.server.Route
import com.cooksys.ssi.dao.{ShippingGroupItemDao, ShippingItemDao}
import slick.driver.MySQLDriver.api._

import scala.concurrent.ExecutionContext

case class InnerShippingGroupRoute(id: Int)(implicit db: Database, ec: ExecutionContext) extends BaseRoute {
  override def internal: Route =
    pathPrefix("items") {
      pathEndOrSingleSlash {
        get {
          ShippingGroupItemDao.indexByShippingGroupId(id)
        }
      }
    }
}
