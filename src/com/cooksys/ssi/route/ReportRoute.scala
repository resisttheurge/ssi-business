package com.cooksys.ssi.route

import com.cooksys.reports.ReportUtil
import com.cooksys.ssi.model.schema.Report
import spray.routing.Route

import scala.concurrent.{ExecutionContext, Future}

class ReportRoute(implicit val ec: ExecutionContext) extends BaseRoute with Report.Implicits {

  override def internal: Route =
    post {
      pathPrefix("reports") {
        path("layout-drawing") {
          entity(as[Report.LayoutDrawing]) { params =>
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
          entity(as[Report.DetailDrawing]) { params =>
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
          entity(as[Report.ComputerDrawing]) { params =>
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
          entity(as[Report.Zone]) { params =>
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
          entity(as[Report.MaterialShipper]) { params =>
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
          entity(as[Report.ShipVia]) { params =>
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
          entity(as[Report.Shipment]) { params =>
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
          entity(as[Report.ManagementReview]) { params =>
            Future {
              Report(
                title = "Management Review Report",
                data = ReportUtil.MANAGEMENT_REVIEW.generate(
                  params.start.toString,
                  params.end.toString
                )
              )
            }
          }
        } ~ path("production-schedule") {
          entity(as[Report.ProductionSchedule]) { params =>
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
          entity(as[Report.SpecialtyItemsByJob]) { params =>
            Future {
              Report(
                title = "Specialty Item Report (by Job)",
                data = ReportUtil.SPECIALTY_ITEMS_BY_JOB.generate(
                  params.jobId.toString
                )
              )
            }
          }
        } ~ path("specialty-items-by=part-type") {
          entity(as[Report.SpecialtyItemsByPartType]) { params =>
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
          entity(as[Report.ShippingGroupShipper]) { params =>
            Future {
              Report(
                title = "RMS",
                data = ReportUtil.SHIPPING_GROUP_SHIPPER.generate(
                  params.jobId.toString
                )
              )
            }
          }
        } ~ path("shipment") {
          entity(as[Report.JobShipment]) { params =>
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
