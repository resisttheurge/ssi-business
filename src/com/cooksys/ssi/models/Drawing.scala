package com.cooksys.ssi.models

import java.sql.Date

case class Drawing(id: Option[Int],
                   jobId: Int,
                   label: String,
                   drawingType: DrawingType,
                   specialtyItem: Option[SpecialtyItem] = None,
                   info: Option[ShippingRequest] = None)
