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
