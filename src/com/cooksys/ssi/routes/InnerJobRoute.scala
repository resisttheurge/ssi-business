package com.cooksys.ssi.routes

import akka.http.scaladsl.server.Route
import com.cooksys.ssi.dao._
import com.cooksys.ssi.models.{SystemType, JobAddresses}
import slick.driver.MySQLDriver.api._

import scala.concurrent.ExecutionContext

case class InnerJobRoute(jobId: Int)(implicit db: Database, ec: ExecutionContext) extends BaseRoute {
  override def internal: Route =
    pathPrefix("addresses") {
      pathEndOrSingleSlash {
        get {
          JobDao.addressesByJobId(jobId)
        } ~ post {
          entity(as[JobAddresses]) { addresses =>
            JobDao.createJobAddresses(jobId, addresses)
          }
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
    } ~ pathPrefix("part-orders") {
      pathEndOrSingleSlash {
        get {
          PartOrderDao.indexByJobId(jobId)
        }
      }
    } ~ pathPrefix("shipping-groups") {
      pathEndOrSingleSlash {
        get {
          ShippingGroupDao.indexByJobId(jobId)
        }
      }
    } ~ pathPrefix("shipments") {
      pathEndOrSingleSlash {
        get {
          ShipmentDao.indexByJobId(jobId)
        }
      }
    } ~ pathPrefix("system-types") {
      get {
        SystemTypeDao.indexByJobId(jobId)
      } ~ post {
        entity(as[SystemType]) {st =>
          JobDao.addSystemType(jobId, st)
        }
      } ~ delete {
        pathPrefix(IntNumber) {systemTypeId =>
          JobDao.removeSystemType(jobId, systemTypeId)
        }
      }
    } ~ pathPrefix("zones") {
      get {
        ZoneDao.indexByJobId(jobId)
      }
    }
}
