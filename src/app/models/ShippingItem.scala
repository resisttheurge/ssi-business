package app.models

case class ShippingItem(pk: Option[Int],
                        status: ShippingItemStatus,
                        label: String,
                        requested: Int,
                        completed: Int,
                        remarks: String,
                        shop: Shop,
                        zones: Vector[ShippingItemZone])
