package app.models

sealed trait PartType

object PartType {
  case object MECH extends PartType
  case object ELEC extends PartType

  def apply(s: String) = s match {
    case "MECH" => MECH
    case "ELEC" => ELEC
  }
}
