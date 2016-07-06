package com.cooksys.ssi.models

case class ShippingItemZone(id: Option[Int],
                            shippingItemId: Int,
                            zone: Zone,
                            quantity: Int)
