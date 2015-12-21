package app.models

sealed trait JobPrefix

object JobPrefix {
  case object B extends JobPrefix
  case object F extends JobPrefix
  case object FC extends JobPrefix
  case object FE extends JobPrefix
  case object FR extends JobPrefix
  case object FS extends JobPrefix
  case object M extends JobPrefix
  case object MF extends JobPrefix
  case object MT extends JobPrefix
  case object RG extends JobPrefix

  def apply(s: String) = s match {
    case "B" => B
    case "F" => F
    case "FC" => FC
    case "FE" => FE
    case "FR" => FR
    case "FS" => FS
    case "M" => M
    case "MF" => MF
    case "MT" => MT
    case "RG" => RG
  }

}