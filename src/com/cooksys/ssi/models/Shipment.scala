package com.cooksys.ssi.models

import java.sql.Date

case class Shipment(id: Option[Int],
                    jobId: Int,
                    number: Int = 1,
                    status: ShipmentStatus = ShipmentStatus.ACTIVE,
                    shop: Option[Shop] = None,
                    carrier: Option[Carrier] = None,
                    weight: Int = 0,
                    billOfLading: Option[String] = None,
                    shipDate: Option[Date] = None,
                    contact: Option[Contact] = None,
                    address: Option[Address] = None
                   )
