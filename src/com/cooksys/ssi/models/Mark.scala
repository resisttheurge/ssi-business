package com.cooksys.ssi.models

case class Mark(id: Option[Int],
                drawingId: Int,
                shippingItem: ShippingItem,
                label: String)
