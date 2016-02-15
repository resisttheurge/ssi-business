package com.cooksys.ssi.models

case class ShippingGroupItem(id: Option[Int],
                             shippingGroupId: Int,
                             shippingItem: ShippingItem,
                             label: String)
