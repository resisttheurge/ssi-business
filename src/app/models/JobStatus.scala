package app.models

sealed trait JobStatus

object JobStatus {
  case object DRAFT extends JobStatus
  case object ACTIVE extends JobStatus
  case object COMPLETED extends JobStatus
  case object CANCELLED extends JobStatus
  case object DELETED extends JobStatus

  def apply(s: String) = s match {
    case "DRAFT" => DRAFT
    case "ACTIVE" => ACTIVE
    case "COMPLETED" => COMPLETED
    case "CANCELLED" => CANCELLED
    case "DELETED" => DELETED
  }
}
