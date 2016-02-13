package com.cooksys.ssi.json

import java.sql.{Date, Timestamp}

import com.cooksys.ssi.models._
import com.cooksys.ssi.utils._
import spray.json._

object JsonProtocol extends JsonProtocol

trait JsonProtocol
  extends DefaultJsonProtocol {

  implicit object SqlDateFormatter extends JsonFormat[Date] {
    override def write(obj: Date): JsValue = JsString(obj.toString)

    override def read(json: JsValue): Date = json match {
      case JsString(x) =>
        try {
          Date.valueOf(x)
        } catch {
          case t: IllegalArgumentException =>
            deserializationError("Expected Date with format `yyyy-[m]m-[d]d`, but got " + x, t)
        }
      case x => deserializationError("Expected Date as JsString, but got " + x)
    }
  }

  implicit object SqlTimestampFormatter extends JsonFormat[Timestamp] {
    override def write(obj: Timestamp): JsValue = JsString(obj.toString)

    override def read(json: JsValue): Timestamp = json match {
      case JsString(x) =>
        try {
          Timestamp.valueOf(x)
        } catch {
          case t: IllegalArgumentException =>
            deserializationError("Expected Timestamp with format `yyyy-[m]m-[d]d hh:mm:ss[.f...]`, but got " + x, t)
        }
      case x => deserializationError("Expected Timestamp as JsString, but got " + x)
    }
  }

  implicit object JobPrefixFormatter extends JsonFormat[JobPrefix] {
    override def write(obj: JobPrefix): JsValue = JsString(obj)

    override def read(json: JsValue): JobPrefix = json match {
      case JsString(x) =>
        try {
          x: JobPrefix
        } catch {
          case t: Throwable =>
            deserializationError(s"Expected JobPrefix to be one of ${JobPrefix.all}, but got " + x, t)
        }
      case x => deserializationError("Expected JobPrefix as JsString, but got " + x)
    }
  }

  implicit object JobStatusFormatter extends JsonFormat[JobStatus] {
    override def write(obj: JobStatus): JsValue = JsString(obj)

    override def read(json: JsValue): JobStatus = json match {
      case JsString(x) =>
        try {
          x: JobStatus
        } catch {
          case t: Throwable =>
            deserializationError(s"Expected JobStatus to be one of ${JobStatus.all}, but got " + x, t)
        }
      case x => deserializationError("Expected JobStatus as JsString, but got " + x)
    }
  }

  implicit val LabelRecordFormatter = rootFormat(jsonFormat2(LabelRecord))

  implicit val ContactFormatter = rootFormat(jsonFormat5(Contact))

  implicit val AddendumFormatter = rootFormat(jsonFormat8(Addendum))

  implicit val AddressFormatter = rootFormat(jsonFormat6(Address))

  implicit val AuthorizationFormatter = rootFormat(jsonFormat2(Authorization))

  implicit val CredentialsFormatter = rootFormat(jsonFormat2(Credentials))

  implicit val JobIdentifierFormatter = rootFormat(jsonFormat3(JobIdentifier))

  implicit val JobFormatter = rootFormat(jsonFormat12(Job))

  implicit val JobAddressesFormatter = rootFormat(jsonFormat2(JobAddresses))

  implicit val JobReportRequestFormatter = rootFormat(jsonFormat1(JobReportRequest))

  implicit val ScheduleFormatter = rootFormat(jsonFormat5(Schedule))

  implicit val JobSchedulesFormatter = rootFormat(jsonFormat5(JobSchedules))

  implicit val JobShipmentReportRequestFormatter = rootFormat(jsonFormat1(JobShipmentReportRequest))

  implicit val ManagementReviewReportRequestFormatter = rootFormat(jsonFormat2(ManagementReviewReportRequest))

  implicit val PartFormatter = rootFormat(jsonFormat4(Part))

  implicit val ProductionScheduleReportRequestFormatter = rootFormat(jsonFormat1(ProductionScheduleReportRequest))

  implicit val ReportFormatter = rootFormat(jsonFormat2(Report))

  implicit val RmsRequestFormatter = rootFormat(jsonFormat2(RmsRequest))

  implicit val SpecialtyItemsByPartTypeReportRequestFormatter = rootFormat(jsonFormat1(SpecialtyItemsByPartTypeReportRequest))

  implicit val UserFormatter = rootFormat(jsonFormat5(User))

  implicit def ResponseFormatter[T: JsonFormat] = rootFormat(jsonFormat3(Response[T]))

  implicit def UpdatedFormatter[T: JsonFormat] = rootFormat(jsonFormat2(Updated[T]))


}
