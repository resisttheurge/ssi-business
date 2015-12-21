package app.models

import java.sql.Date

case class PartOrder(pk: Option[Int],
                     jobPk: Int,
                     drawingPk: Option[Int],
                     status: PartOrderStatus,
                     po: String,
                     requestedQuantity: Int,
                     stockQuantity: Int,
                     purchaseQuantity: Int,
                     requestDate: Date,
                     purchaseDate: Date,
                     releaseDate: Date,
                     releasedBy: String,
                     part: Part,
                     manufacturer: Manufacturer,
                     vendor: Vendor)
