package com.cooksys.ssi.routes

import akka.http.scaladsl.server.Route
import com.cooksys.ssi.dao.MarkDao
import slick.driver.MySQLDriver.api._

import scala.concurrent.ExecutionContext

case class InnerDrawingRoute(id: Int)(implicit db: Database, ec: ExecutionContext) extends BaseRoute {
  override def internal: Route =
    pathPrefix("marks") {
      pathEndOrSingleSlash {
        get {
          MarkDao.indexByDrawingId(id)
        }
      }
    }
}
