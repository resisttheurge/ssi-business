import { ApiService } from 'utils'
import { pdfConverter } from 'utils'

export default class Report extends ApiService {
  /*@ngInject*/
  constructor ($resource, endpoint, $q, $unpack) {
    super()

    var self = this;

    self.endpoint = $resource(endpoint + '/reports/:reportTitle', {}, {
        generate: { method: 'POST' }
      })

    self.productionSchedule = weekEnding =>
          self.endpoint
            .generate({ reportTitle: 'production-schedule' }, { weekEnding })
            .$promise
            .then(report => report.data).catch('some exception')

    self.managementReview = (start, end) =>
          self.endpoint
            .generate({ reportTitle: 'management-review' }, { start, end })
            .$promise
            .then(report => report.data).catch('some exception')

    self.rms = (jobId, shippingGroupId) =>
          self.endpoint
            .generate({ reportTitle: 'rms' }, { jobId, shippingGroupId })
            .$promise
            .then(report => report.data).catch('some exception')

    self.shipment = (shipmentId) =>
          self.endpoint
            .generate({ reportTitle: 'shipmentId' }, { shipmentId })
            .$promise
            .then(report => report.data).catch('some exception')

    self.jobShipments = (jobId) =>
          self.endpoint
            .generate({ reportTitle: 'job-shipments' }, { jobId })
            .$promise
            .then(report => report.data).catch('some exception')

    self.shipVia = (jobId) =>
          self.endpoint
            .generate({ reportTitle: 'ship-via' }, { jobId })
            .$promise
            .then(report => report.data).catch('some exception')

    self.materialShipper = (jobId) =>
          self.endpoint
            .generate({ reportTitle: 'material-shipper' }, { jobId })
            .$promise
            .then(report => report.data).catch('some exception')

    self.specialtyItemsByJob = (jobId) =>
          self.endpoint
            .generate({ reportTitle: 'specialty-items-by-job' }, { jobId })
            .$promise
            .then(report => report.data).catch('some exception')

    self.specialtyItemsByPartType = (partType) =>
          self.endpoint
            .generate({ reportTitle: 'specialty-items-by-part-type' }, { partType })
            .$promise
            .then(report => report.data).catch('some exception')

    self.layoutDrawing = (jobId) =>
      self.endpoint
            .generate({ reportTitle: 'layout-drawing' }, { jobId })
            .$promise
            .then(report => report.data).catch('some exception')

    self.detailDrawing = (jobId) =>
          self.endpoint
            .generate({ reportTitle: 'detail-drawing' }, { jobId })
            .$promise
            .then(report => report.data).catch('some exception')

    self.computerDrawing = (jobId) =>
          self.endpoint
            .generate({ reportTitle: 'computer-drawing' }, { jobId })
            .$promise
            .then(report => report.data).catch('some exception')

    self.zone = (jobId) =>
          self.endpoint
            .generate({ reportTitle: 'zone' }, { jobId })
            .$promise
            .then(report => report.data).catch('some exception')

  }

}

// path("layout-drawing") {
//   entity(as[LayoutDrawingReportRequest]) { params =>
//     Future {
//       Report(
//         title = "Layout Drawing Report",
//         data = ReportUtil.LAYOUT_DRAWING.generate(
//           params.jobId.toString
//
// path("detail-drawing") {
//   entity(as[DetailDrawingReportRequest]) { params =>
//     Future {
//       Report(
//         title = "Detail Drawing Report",
//         data = ReportUtil.DETAIL_DRAWING.generate(
//           params.jobId.toString
//           path("computer-drawing") {
//             entity(as[ComputerDrawingReportRequest]) { params =>
//               Future {
//                 Report(
//                   title = "Computer Drawing Report",
//                   data = ReportUtil.COMPUTER_DRAWING.generate(
//                     params.jobId.toString
//                   )
//                 )
//               }
//             }
// path("zone") {
// entity(as[ZoneReportRequest]) { params =>
// Report(
//   title = "Zone Report",
//   data = ReportUtil.ZONE.generate(
//     params.jobId.toString
//   )
// )
// }
// }
// } ~ path("material-shipper") {
// entity(as[MaterialShipperReportRequest]) { params =>
// Future {
// Report(
//   title = "Material Shipper Report",
//   data = ReportUtil.MATERIAL_SHIPPER.generate(
//     params.jobId.toString
//   )
// )
// }
// }
// } ~ path("ship-via") {
// entity(as[ShipViaReportRequest]) { params =>
// Future {
// Report(
//   title = "Ship Via Report",
//   data = ReportUtil.SHIP_VIA.generate(
//     params.jobId.toString
//   )
// )
// }
// }
// } ~ path("job-shipments") {
// entity(as[ShipmentReportRequest]) { params =>
// Future {
// Report(
//   title = "Job Shipments Report",
//   data = ReportUtil.SHIPMENT.generate(
//     params.jobId.toString
//   )
// )
// }
// }
// } ~ path("management-review") {
// entity(as[ManagementReviewReportRequest]) { params =>
// Future {
// Report(
//   title = "Management Review Report",
//   data = ReportUtil.MANAGEMENT_REVIEW.generate(
//     params.start.toString,
//     params.end.toString
//   )
// )
// }
// }
// } ~ path("production-schedule") {
// entity(as[ProductionScheduleReportRequest]) { params =>
// Future {
// Report(
//   title = "Production Schedule Report",
//   data = ReportUtil.PRODUCTION_SCHEDULE.generate(
//     params.weekEnding.toString
//   )
// )
// }
// }
// } ~ path("specialty-items-by-job") {
// entity(as[SpecialtyItemsByJobReportRequest]) { params =>
// Future {
// Report(
//   title = "Specialty Item Report (by Job)",
//   data = ReportUtil.SPECIALTY_ITEMS_BY_JOB.generate(
//     params.jobId.toString
//   )
// )
// }
// }
// } ~ path("specialty-items-by-part-type") {
// entity(as[SpecialtyItemsByPartTypeReportRequest]) { params =>
// Future {
// Report(
//   title = "Specialty Item Report (by Part Type)",
//   data = ReportUtil.SPECIALTY_ITEMS_BY_PART_TYPE.generate(
//     params.partType
//   )
// )
// }
// }
// } ~ path("rms") {
// entity(as[RmsRequest]) { params =>
// Future {
// Report(
//   title = "RMS",
//   data = ReportUtil.SHIPPING_GROUP_SHIPPER.generate(
//     params.jobId.toString,
//     params.shippingGroupId.toString
//   )
// )
// }
// }
// } ~ path("shipment") {
// entity(as[JobShipmentReportRequest]) { params =>
// Future {
// Report(
//   title = "Shipment Report",
//   data = ReportUtil.JOB_SHIPMENT.generate(
//     params.shipmentId.toString
//   )
// )
// }
// }
// }
