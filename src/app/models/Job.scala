package app.models

import java.sql.Date

case class Job(pk: Option[Int],
               id: JobId,
               status: JobStatus,
               description: String,
               contractPrice: String,
               startDate: Date,
               dueDate: Date,
               shop: Shop,
               salesperson: Salesperson,
               customer: Customer,
               contact: Contact,
               addresses: JobAddresses,
               schedules: JobSchedules,
               revisions: Vector[Revision],
               drawings: Vector[Drawing],
               shippingGroups: Vector[ShippingGroup],
               partOrders: Vector[PartOrder],
               shipments: Vector[Shipment],
               zones: Vector[Zone])
