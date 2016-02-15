package com.cooksys.ssi.routes

import akka.http.scaladsl.server.Route
import com.cooksys.ssi.dao.{ShippingGroupDao, DrawingDao, JobDao}
import slick.driver.MySQLDriver.api._

import scala.concurrent.ExecutionContext

case class InnerJobRoute(jobId: Int)(implicit db: Database, ec: ExecutionContext) extends BaseRoute {
  override def internal: Route =
    pathPrefix("addresses") {
      pathEndOrSingleSlash {
        get {
          JobDao.addressesByJobId(jobId)
        }
      }
    } ~ pathPrefix("schedules") {
      pathEndOrSingleSlash {
        get {
          JobDao.schedulesByJobId(jobId)
        }
      }
    } ~ pathPrefix("drawings") {
      pathEndOrSingleSlash {
        get {
          DrawingDao.indexByJobId(jobId)
        }
      }
    } ~ pathPrefix("shipping-groups") {
      pathEndOrSingleSlash {
        get {
          ShippingGroupDao.indexByJobId(jobId)
        }
      }
    }
}
