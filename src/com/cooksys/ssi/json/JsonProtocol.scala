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

  implicit object DrawingTypeFormatter extends JsonFormat[DrawingType] {
    override def write(obj: DrawingType): JsValue = JsString(obj)

    override def read(json: JsValue): DrawingType = json match {
      case JsString(x) =>
        try {
          x: DrawingType
        } catch {
          case t: Throwable =>
            deserializationError(s"Expected DrawingType to be one of ${DrawingType.all.mkString("[",", ","]")}, but got $x", t)
        }
      case x => deserializationError(s"Expected DrawingType as JsString, but got $x")
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

  implicit object PartOrderStatusFormatter extends JsonFormat[PartOrderStatus] {
    override def write(obj: PartOrderStatus): JsValue = JsString(obj)

    override def read(json: JsValue): PartOrderStatus = json match {
      case JsString(x) =>
        try {
          x: PartOrderStatus
        } catch {
          case t: Throwable =>
            deserializationError(s"Expected PartOrderStatus to be one of ${PartOrderStatus.all.mkString("[",", ","]")}, but got $x", t)
        }
      case x => deserializationError(s"Expected PartOrderStatus as JsString, but got $x")
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

  implicit object ShippingItemStatusFormatter extends JsonFormat[ShippingItemStatus] {
    override def write(obj: ShippingItemStatus): JsValue = JsString(obj)

    override def read(json: JsValue): ShippingItemStatus = json match {
      case JsString(x) =>
        try {
          x: ShippingItemStatus
        } catch {
          case t: Throwable =>
            deserializationError(s"Expected ShippingItemStatus to be one of ${ShippingItemStatus.all.mkString("[",", ","]")}, but got $x", t)
        }
      case x => deserializationError(s"Expected ShippingItemStatus as JsString, but got $x")
    }
  }

  implicit object TagTypeFormatter extends JsonFormat[TagType] {
    override def write(obj: TagType): JsValue = JsString(obj)

    override def read(json: JsValue): TagType = json match {
      case JsString(x) =>
        try {
          x: TagType
        } catch {
          case t: Throwable =>
            deserializationError(s"Expected TagType to be one of ${TagType.all.mkString("[",", ","]")}, but got $x", t)
        }
      case x => deserializationError(s"Expected TagType as JsString, but got $x")
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

  implicit object ShipmentStatusFormatter extends JsonFormat[ShipmentStatus] {
    override def write(obj: ShipmentStatus): JsValue = JsString(obj)

    override def read(json: JsValue): ShipmentStatus = json match {
      case JsString(x) =>
        try {
          x: ShipmentStatus
        } catch {
          case t: Throwable =>
            deserializationError(s"Expected ShipmentStatus to be one of ${ShipmentStatus.all.mkString("[",", ","]")}, but got $x", t)
        }
      case x => deserializationError(s"Expected ShipmentStatus as JsString, but got $x")
    }
  }

  implicit val LabelRecordFormatter = rootFormat(jsonFormat2(LabelRecord))

  implicit val ContactFormatter = rootFormat(jsonFormat5(Contact))

  implicit val AddressFormatter = rootFormat(jsonFormat6(Address))

  implicit val ShippingRequestFormatter = rootFormat(jsonFormat16(ShippingRequest))

  implicit val DrawingFormatter = rootFormat(jsonFormat6(Drawing))

  implicit val ShippingGroupFormatter = rootFormat(jsonFormat5(ShippingGroup))

  implicit val AuthorizationFormatter = rootFormat(jsonFormat2(Authorization))

  implicit val CredentialsFormatter = rootFormat(jsonFormat2(Credentials))

  implicit val JobIdentifierFormatter = rootFormat(jsonFormat3(JobIdentifier))

  implicit val JobAddressesFormatter = rootFormat(jsonFormat2(JobAddresses))

  implicit val JobFormatter = rootFormat(jsonFormat14(Job))

  implicit val JobReportRequestFormatter = rootFormat(jsonFormat1(JobReportRequest))

  implicit val ScheduleFormatter = rootFormat(jsonFormat5(Schedule))

  implicit val JobSchedulesFormatter = rootFormat(jsonFormat5(JobSchedules))

  implicit val JobShipmentReportRequestFormatter = rootFormat(jsonFormat1(JobShipmentReportRequest))

  implicit val ManagementReviewReportRequestFormatter = rootFormat(jsonFormat8(ManagementReviewReportRequest))

  implicit val ProductionScheduleReportRequestFormatter = rootFormat(jsonFormat1(ProductionScheduleReportRequest))

  implicit val ReportFormatter = rootFormat(jsonFormat2(Report))

  implicit val RmsRequestFormatter = rootFormat(jsonFormat2(RmsRequest))

  implicit val SpecialtyItemsByPartTypeReportRequestFormatter = rootFormat(jsonFormat1(SpecialtyItemsByPartTypeReportRequest))

  implicit val UserFormatter = rootFormat(jsonFormat5(User))

  implicit val ZoneFormatter = rootFormat(jsonFormat4(Zone))

  implicit val ShippingItemFormatter = rootFormat(jsonFormat7(ShippingItem))

  implicit val PartOrderFormatter = rootFormat(jsonFormat18(PartOrder))

  implicit val ShippingItemZoneFormatter = rootFormat(jsonFormat4(ShippingItemZone))

  implicit val ShipmentFormatter = rootFormat(jsonFormat11(Shipment))

  implicit val ShipmentItemFormatter = rootFormat(jsonFormat4(ShipmentItem))

  implicit val ShippingGroupItemFormatter = rootFormat(jsonFormat4(ShippingGroupItem))

  implicit val MarkFormatter = rootFormat(jsonFormat4(Mark))

  implicit def ResponseFormatter[T: JsonFormat] = rootFormat(jsonFormat3(Response[T]))

  implicit def UpdatedFormatter[T: JsonFormat] = rootFormat(jsonFormat2(Updated[T]))


}
