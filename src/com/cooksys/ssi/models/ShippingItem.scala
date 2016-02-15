package com.cooksys.ssi.models

case class ShippingItem(id: Option[Int],
                        status: ShippingItemStatus = ShippingItemStatus.NS,
                        label: Option[String] = None,
                        requested: Int = 0,
                        completed: Int = 0,
                        remarks: Option[String] = None,
                        shop: Option[Shop] = None)