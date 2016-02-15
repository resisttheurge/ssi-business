package com.cooksys.ssi.models

import java.sql.Date

case class PartOrder(id: Option[Int],
                     jobId: Int,
                     drawingId: Option[Int] = None,
                     status: PartOrderStatus,
                     part: Option[Part] = None,
                     manufacturer: Option[Manufacturer] = None,
                     vendor: Option[Vendor] = None,
                     po: Option[String] = None,
                     requestedQuantity: Int = 0,
                     stockQuantity: Int = 0,
                     purchaseQuantity: Int = 0,
                     requestDate: Option[Date] = None,
                     purchaseDate: Option[Date] = None,
                     releaseDate: Option[Date] = None,
                     releasedBy: Option[String] = None)
