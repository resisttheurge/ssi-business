package app.models

case class Mark(pk: Option[Int],
                drawingPk: Int,
                label: String,
                tagType: TagType,
                item: ShippingItem)
