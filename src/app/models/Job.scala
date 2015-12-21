package app.models

import java.sql.Date

case class Job(pk: Option[Int],
               id: JobId,
               status: JobStatus,
               description: String,
               contractPrice: Option[BigDecimal],
               startDate: Date,
               dueDate: Date,
               shop: Option[Shop],
               salesperson: Option[Salesperson],
               customer: Option[Customer],
               contact: Option[Contact],
               addresses: JobAddresses,
               schedules: JobSchedules,
               revisions: Vector[Revision],
               drawings: Vector[Drawing],
               shippingGroups: Vector[ShippingGroup],
               partOrders: Vector[PartOrder],
               shipments: Vector[Shipment],
               zones: Vector[Zone])
