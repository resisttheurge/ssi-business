package app.models

case class ShippingGroupItem(pk: Option[Int],
                             label: String,
                             item: ShippingItem)
