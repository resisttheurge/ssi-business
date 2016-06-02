package com.cooksys.ssi.routes

import akka.http.scaladsl.server.Route
import com.cooksys.reports.ReportUtil
import com.cooksys.ssi.models._

import scala.concurrent.{ExecutionContext, Future}

case class ReportRoute(path: String)(implicit val ec: ExecutionContext) extends BaseRoute {

  override def internal: Route =

    pathPrefix(path) {
      post {
        path("layout-drawing") {
          entity(as[LayoutDrawingReportRequest]) { params =>
            Future {
              Report(
                title = "Layout Drawing Report",
                data = ReportUtil.LAYOUT_DRAWING.generate(
                  params.jobId.toString
                )
              )
            }
          }
        } ~ path("detail-drawing") {
          entity(as[DetailDrawingReportRequest]) { params =>
            Future {
              Report(
                title = "Detail Drawing Report",
                data = ReportUtil.DETAIL_DRAWING.generate(
                  params.jobId.toString
                )
              )
            }
          }
        } ~ path("computer-drawing") {
          entity(as[ComputerDrawingReportRequest]) { params =>
            Future {
              Report(
                title = "Computer Drawing Report",
                data = ReportUtil.COMPUTER_DRAWING.generate(
                  params.jobId.toString
                )
              )
            }
          }
        } ~ path("zone") {
          entity(as[ZoneReportRequest]) { params =>
            Future {
              Report(
                title = "Zone Report",
                data = ReportUtil.ZONE.generate(
                  params.jobId.toString
                )
              )
            }
          }
        } ~ path("material-shipper") {
          entity(as[MaterialShipperReportRequest]) { params =>
            Future {
              Report(
                title = "Material Shipper Report",
                data = ReportUtil.MATERIAL_SHIPPER.generate(
                  params.jobId.toString
                )
              )
            }
          }
        } ~ path("ship-via") {
          entity(as[ShipViaReportRequest]) { params =>
            Future {
              Report(
                title = "Ship Via Report",
                data = ReportUtil.SHIP_VIA.generate(
                  params.jobId.toString
                )
              )
            }
          }
        } ~ path("job-shipments") {
          entity(as[ShipmentReportRequest]) { params =>
            Future {
              Report(
                title = "Job Shipments Report",
                data = ReportUtil.SHIPMENT.generate(
                  params.jobId.toString
                )
              )
            }
          }
        } ~ path("management-review") {
          entity(as[ManagementReviewReportRequest]) { params =>
            Future {
              Report(
                title = "Management Review Report",
                data = ReportUtil.MANAGEMENT_REVIEW.generate(
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
            }
          }
        } ~ path("production-schedule") {
          entity(as[ProductionScheduleReportRequest]) { params =>
            Future {
              Report(
                title = "Production Schedule Report",
                data = ReportUtil.PRODUCTION_SCHEDULE.generate(
                  params.weekEnding.toString
                )
              )
            }
          }
        } ~ path("specialty-items-by-job") {
          entity(as[SpecialtyItemsByJobReportRequest]) { params =>
            Future {
              Report(
                title = "Specialty Item Report (by Job)",
                data = ReportUtil.SPECIALTY_ITEMS_BY_JOB.generate(
                  params.jobId.toString
                )
              )
            }
          }
        } ~ path("specialty-items-by-part-type") {
          entity(as[SpecialtyItemsByPartTypeReportRequest]) { params =>
            Future {
              Report(
                title = "Specialty Item Report (by Part Type)",
                data = ReportUtil.SPECIALTY_ITEMS_BY_PART_TYPE.generate(
                  params.partType
                )
              )
            }
          }
        } ~ path("rms") {
          entity(as[RmsRequest]) { params =>
            Future {
              Report(
                title = "RMS",
                data = ReportUtil.SHIPPING_GROUP_SHIPPER.generate(
                  params.jobId.toString,
                  params.shippingGroupId.toString
                )
              )
            }
          }
        } ~ path("shipment") {
          entity(as[JobShipmentReportRequest]) { params =>
            Future {
              Report(
                title = "Shipment Report",
                data = ReportUtil.JOB_SHIPMENT.generate(
                  params.shipmentId.toString
                )
              )
            }
          }
        }
      }
    }

}
