package app.models

sealed trait DrawingType

object DrawingType {
  case object DETAIL extends DrawingType
  case object LAYOUT extends DrawingType

  def apply(s: String) = s match {
    case "DETAIL" => DETAIL
    case "LAYOUT" => LAYOUT
  }

}
