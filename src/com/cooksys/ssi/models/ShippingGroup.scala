package com.cooksys.ssi.models

case class ShippingGroup(id: Option[Int],
                         jobId: Int,
                         label: String,
                         rush: Boolean = false,
                         info: Option[ShippingRequest] = None)
