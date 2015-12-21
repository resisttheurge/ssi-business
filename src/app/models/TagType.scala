package app.models

sealed trait TagType

object TagType {
  case object S extends TagType
  case object W extends TagType

  def apply(s: String) = s match {
    case "S" => S
    case "W" => W
  }

}
