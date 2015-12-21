package app.models

case class ShipmentItem(pk: Option[Int],
                        quantity: Int,
                        item: ShippingItem)
