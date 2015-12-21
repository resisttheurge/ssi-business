package app.models

import java.sql.Date

case class Shipment(pk: Option[Int],
                    jobPk: Int,
                    number: Int,
                    status: ShipmentStatus,
                    billOfLading: String,
                    shipDate: Date,
                    shop: Shop,
                    carrier: Carrier,
                    contact: Contact,
                    address: Address,
                    items: Vector[ShipmentItem])
