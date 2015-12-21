package app.models

sealed trait DrawingType

object DrawingType {
  case object DETAIL extends DrawingType
  case object LAYOUT extends DrawingType
}
