package app.models

sealed trait ScheduleType

object ScheduleType {

  def apply(s: String): ScheduleType = s match {
    case "ENGINEERING" => ENGINEERING
    case "MECHANICAL" => MECHANICAL
    case "ELECTRICAL" => ELECTRICAL
    case "SHIPPING" => SHIPPING
    case "INSTALLATION" => INSTALLATION
  }

  case object ENGINEERING extends ScheduleType

  case object MECHANICAL extends ScheduleType

  case object ELECTRICAL extends ScheduleType

  case object SHIPPING extends ScheduleType

  case object INSTALLATION extends ScheduleType

}


