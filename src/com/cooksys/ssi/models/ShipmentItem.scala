package com.cooksys.ssi.models

case class ShipmentItem(id: Option[Int],
                        shipmentId: Int,
                        shippingItem: ShippingItem,
                        quantity: Int)
