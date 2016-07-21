package com.cooksys.ssi.routes

import akka.http.scaladsl.server.Route
import com.cooksys.reports.ReportUtil
import com.cooksys.ssi.models._
import slick.driver.MySQLDriver.api._

import scala.concurrent.{ExecutionContext, Future}

case class ReportRoute(path: String)(implicit val db: Database, ec: ExecutionContext) extends BaseRoute {

  override def internal: Route =

    pathPrefix(path) {
      post {
        path("layout-drawing") {
          entity(as[LayoutDrawingReportRequest]) { params =>
            Future {
              val session = db.createSession()
              val report = Report(
                title = "Layout Drawing Report",
                data = ReportUtil.LAYOUT_DRAWING.generate(
                  session.conn,
                  params.jobId.toString
                )
              )
              session.close()
              report
            }
          }
        } ~ path("detail-drawing") {
          entity(as[DetailDrawingReportRequest]) { params =>
            Future {
              val session = db.createSession()
              val report = Report(
                title = "Detail Drawing Report",
                data = ReportUtil.DETAIL_DRAWING.generate(
                  session.conn,
                  params.jobId.toString
                )
              )
              session.close()
              report
            }
          }
        } ~ path("computer-drawing") {
          entity(as[ComputerDrawingReportRequest]) { params =>
            Future {
              val session = db.createSession()
              val report = Report(
                title = "Computer Drawing Report",
                data = ReportUtil.COMPUTER_DRAWING.generate(
                  session.conn,
                  params.jobId.toString
                )
              )
              session.close()
              report
            }
          }
        } ~ path("zone") {
          entity(as[ZoneReportRequest]) { params =>
            Future {
              val session = db.createSession()
              val report = Report(
                title = "Zone Report",
                data = ReportUtil.ZONE.generate(
                  session.conn,
                  params.jobId.toString
                )
              )
              session.close()
              report
            }
          }
        } ~ path("material-shipper") {
          entity(as[MaterialShipperReportRequest]) { params =>
            Future {
              val session = db.createSession()
              val report = Report(
                title = "Material Shipper Report",
                data = ReportUtil.MATERIAL_SHIPPER.generate(
                  session.conn,
                  params.jobId.toString
                )
              )
              session.close()
              report
            }
          }
        } ~ path("ship-via") {
          entity(as[ShipViaReportRequest]) { params =>
            Future {
              val session = db.createSession()
              val report = Report(
                title = "Ship Via Report",
                data = ReportUtil.SHIP_VIA.generate(
                  session.conn,
                  params.jobId.toString
                )
              )
              session.close()
              report
            }
          }
        } ~ path("job-shipments") {
          entity(as[ShipmentReportRequest]) { params =>
            Future {
              val session = db.createSession()
              val report = Report(
                title = "Job Shipments Report",
                data = ReportUtil.SHIPMENT.generate(
                  session.conn,
                  params.jobId.toString
                )
              )
              session.close()
              report
            }
          }
        } ~ path("management-review") {
          entity(as[ManagementReviewReportRequest]) { params =>
            Future {
              val session = db.createSession()
              val report = Report(
                title = "Management Review Report",
                data = ReportUtil.MANAGEMENT_REVIEW.generate(
                  session.conn,
                  params.start.map(_.toString).getOrElse(""),
                  params.end.map(_.toString).getOrElse(""),
                  params.prefix,
                  params.year,
                  params.label,
                  params.city,
                  params.state,
                  params.customer
                )
              )
              session.close()
              report
            }
          }
        } ~ path("job-search") {
          entity(as[JobSearchReportRequest]) { params =>
            Future {
              val session = db.createSession()
              val report = Report(
                title = "Job Search Report",
                data = ReportUtil.JOB_SEARCH.generate(
                  session.conn,
                  params.start.map(_.toString).getOrElse(""),
                  params.end.map(_.toString).getOrElse(""),
                  params.prefix,
                  params.year,
                  params.label,
                  params.city,
                  params.state,
                  params.customer,
                  params.description
                )
              )
              session.close()
              report
            }
          }
        } ~ path("production-schedule") {
          entity(as[ProductionScheduleReportRequest]) { params =>
            Future {
              val session = db.createSession()
              val report = Report(
                title = "Production Schedule Report",
                data = ReportUtil.PRODUCTION_SCHEDULE.generate(
                  session.conn,
                  params.weekEnding.toString
                )
              )
              session.close()
              report
            }
          }
        } ~ path("specialty-items-by-job") {
          entity(as[SpecialtyItemsByJobReportRequest]) { params =>
            Future {
              val session = db.createSession()
              val report = Report(
                title = "Specialty Item Report (by Job)",
                data = ReportUtil.SPECIALTY_ITEMS_BY_JOB.generate(
                  session.conn,
                  params.jobId.toString
                )
              )
              session.close()
              report
            }
          }
        } ~ path("specialty-items-by-part-type") {
          entity(as[SpecialtyItemsByPartTypeReportRequest]) { params =>
            Future {
              val session = db.createSession()
              val report = Report(
                title = "Specialty Item Report (by Part Type)",
                data = ReportUtil.SPECIALTY_ITEMS_BY_PART_TYPE.generate(
                  session.conn,
                  params.partType
                )
              )
              session.close()
              report
            }
          }
        } ~ path("rms") {
          entity(as[RmsRequest]) { params =>
            Future {
              val session = db.createSession()
              val report = Report(
                title = "RMS",
                data = ReportUtil.SHIPPING_GROUP_SHIPPER.generate(
                  session.conn,
                  params.jobId.toString,
                  params.shippingGroupId.toString
                )
              )
              session.close()
              report
            }
          }
        } ~ path("shipment") {
          entity(as[JobShipmentReportRequest]) { params =>
            Future {
              val session = db.createSession()
              val report = Report(
                title = "Shipment Report",
                data = ReportUtil.JOB_SHIPMENT.generate(
                  session.conn,
                  params.shipmentId.toString
                )
              )
              session.close()
              report
            }
          }
        }
      }
    }

}
