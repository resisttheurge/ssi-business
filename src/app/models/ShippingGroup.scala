package app.models

case class ShippingGroup(pk: Option[Int],
                         jobPk: Int,
                         label: String,
                         rush: Boolean,
                         shop: Shop,
                         items: Vector[ShippingGroupItem])
