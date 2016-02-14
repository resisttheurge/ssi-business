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
            deserializationError(s"Expected Date with format `yyyy-[m]m-[d]d`, but got $x", t)
        }
      case x => deserializationError(s"Expected Date as JsString, but got $x")
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
            deserializationError(s"Expected Timestamp with format `yyyy-[m]m-[d]d hh:mm:ss[.f...]`, but got $x", t)
        }
      case x => deserializationError(s"Expected Timestamp as JsString, but got $x")
    }
  }

  implicit object JobAddressTypeFormatter extends JsonFormat[JobAddressType] {
    override def write(obj: JobAddressType): JsValue = JsString(obj)

    override def read(json: JsValue): JobAddressType = json match {
      case JsString(x) =>
        try {
          x: JobAddressType
        } catch {
          case t: Throwable =>
            deserializationError(s"Expected JobAddressType to be one of ${JobAddressType.all.mkString("[",", ","]")}, but got $x", t)
        }
      case x => deserializationError(s"Expected JobAddressType as JsString, but got $x")
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
            deserializationError(s"Expected JobPrefix to be one of ${JobPrefix.all.mkString("[",", ","]")}, but got $x", t)
        }
      case x => deserializationError(s"Expected JobPrefix as JsString, but got $x")
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
            deserializationError(s"Expected JobStatus to be one of ${JobStatus.all.mkString("[",", ","]")}, but got $x", t)
        }
      case x => deserializationError(s"Expected JobStatus as JsString, but got $x")
    }
  }

  implicit object PartTypeFormatter extends JsonFormat[PartType] {
    override def write(obj: PartType): JsValue = JsString(obj)

    override def read(json: JsValue): PartType = json match {
      case JsString(x) =>
        try {
          x: PartType
        } catch {
          case t: Throwable =>
            deserializationError(s"Expected PartType to be one of ${PartType.all.mkString("[",", ","]")}, but got $x", t)
        }
      case x => deserializationError(s"Expected PartType as JsString, but got $x")
    }
  }

  implicit object ScheduleTypeFormatter extends JsonFormat[ScheduleType] {
    override def write(obj: ScheduleType): JsValue = JsString(obj)

    override def read(json: JsValue): ScheduleType = json match {
      case JsString(x) =>
        try {
          x: ScheduleType
        } catch {
          case t: Throwable =>
            deserializationError(s"Expected ScheduleType to be one of ${ScheduleType.all.mkString("[",", ","]")}, but got $x", t)
        }
      case x => deserializationError(s"Expected ScheduleType as JsString, but got $x")
    }
  }

  implicit object UserRoleTypeFormatter extends JsonFormat[UserRoleType] {
    override def write(obj: UserRoleType): JsValue = JsString(obj)

    override def read(json: JsValue): UserRoleType = json match {
      case JsString(x) =>
        try {
          x: UserRoleType
        } catch {
          case t: Throwable =>
            deserializationError(s"Expected UserRoleType to be one of ${UserRoleType.all.mkString("[",", ","]")}, but got $x", t)
        }
      case x => deserializationError(s"Expected UserRoleType as JsString, but got $x")
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
