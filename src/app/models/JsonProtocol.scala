package app.models

import java.sql.{Timestamp, Date}

import spray.httpx.SprayJsonSupport
import spray.json._

object JsonProtocol extends DefaultJsonProtocol with SprayJsonSupport {

  implicit def ptimestamp = new JsonFormat[Timestamp] {
    override def read(json: JsValue): Timestamp = json match {
      case JsString("") => null
      case JsString(timestamp) if timestamp.matches("[0-9]{4}-[0-9]{1,2}-[0-9]{1,2} [0-9]{2}:[0-9]{2}:[0-9]{2}") => Timestamp.valueOf(timestamp)
      case _ => throw new DeserializationException("expected Timestamp in format `yyyy-[m]m-[d]d HH:MM:SS`")
    }

    override def write(obj: Timestamp): JsValue = JsString(obj.formatted("%1$tF %1$tT"))
  }

  implicit def pdate = new JsonFormat[Date] {
    override def read(json: JsValue): Date = json match {
      case JsString("") => null
      case JsString(date) if date.matches("[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}") => Date.valueOf(date)
      case _ => throw new DeserializationException("expected Date in format yyyy-[m]m-[d]d")
    }
    override def write(obj: Date): JsValue = JsString(obj.formatted("%tF"))
  }

  implicit def paddress = jsonFormat6(Address)

  implicit def pcarrier = jsonFormat2(Carrier)

  implicit def pcontact = jsonFormat5(Contact)

  implicit def pshop = jsonFormat2(Shop)

  implicit def pmanufacturer = jsonFormat2(Manufacturer)

  implicit def pvendor = jsonFormat2(Vendor)

  implicit def pcustomer = jsonFormat2(Customer)

  implicit def psalesperson = jsonFormat2(Salesperson)

  implicit def pshipmentstatus = new JsonFormat[ShipmentStatus] {

    override def read(json: JsValue): ShipmentStatus = json match {
      case JsString("ACTIVE") => ShipmentStatus.ACTIVE
      case JsString("POSTED") => ShipmentStatus.POSTED
      case JsString("COMPLETED") => ShipmentStatus.COMPLETED
      case JsString("CANCELLED") => ShipmentStatus.CANCELLED
      case JsString("DELETED") => ShipmentStatus.DELETED
      case _ => throw new DeserializationException("expected ShipmentStatus (one of `ACTIVE|POSTED|COMPLETED|CANCELLED|DELETED`)")
    }

    override def write(obj: ShipmentStatus): JsValue = JsString(obj.toString)

  }

  implicit def pshippingitemstatus = new JsonFormat[ShippingItemStatus] {

    override def read(json: JsValue): ShippingItemStatus = json match {
      case JsString("FAB") => ShippingItemStatus.FAB
      case JsString("PREFAB") => ShippingItemStatus.PREFAB
      case JsString("SHPD") => ShippingItemStatus.SHPD
      case JsString("RTA") => ShippingItemStatus.RTA
      case JsString("RTS") => ShippingItemStatus.RTS
      case JsString("MACH") => ShippingItemStatus.MACH
      case JsString("MOO") => ShippingItemStatus.MOO
      case JsString("NS") => ShippingItemStatus.NS
      case JsString("PAINT") => ShippingItemStatus.PAINT
      case JsString("SIP") => ShippingItemStatus.SIP
      case JsString("WP") => ShippingItemStatus.WP
      case JsString("SAMPLE") => ShippingItemStatus.SAMPLE
      case JsString("MEM") => ShippingItemStatus.MEM
      case JsString("FTS") => ShippingItemStatus.FTS
      case JsString("VOID") => ShippingItemStatus.VOID
      case JsString("NEXT") => ShippingItemStatus.NEXT
      case JsString("HOLD") => ShippingItemStatus.HOLD
      case _ => throw new DeserializationException("expected ShippingItemStatus (one of `FAB|PREFAB|SHPD|RTA|RTS|MACH|MOO|NS|PAINT|SIP|WP|SAMPLE|MEM|FTS|VOID|NEXT|HOLD`)")
    }

    override def write(obj: ShippingItemStatus): JsValue = JsString(obj.toString)

  }

  implicit def pparttype = new JsonFormat[PartType] {

    override def read(json: JsValue): PartType = json match {
      case JsString("MECH") => PartType.MECH
      case JsString("ELEC") => PartType.ELEC
      case _ => throw new DeserializationException("expected PartType (one of `MECH|ELEC`)")
    }

    override def write(obj: PartType): JsValue = JsString(obj.toString)

  }

  implicit def ppartorderstatus = new JsonFormat[PartOrderStatus] {
    override def read(json: JsValue): PartOrderStatus = json match {
      case JsString("ACTIVE") => PartOrderStatus.ACTIVE
      case JsString("COMPLETED") => PartOrderStatus.COMPLETED
      case JsString("CANCELLED") => PartOrderStatus.CANCELLED
      case JsString("DELETED") => PartOrderStatus.DELETED
      case _ => throw new DeserializationException("expected PartOrderStatus (one of `ACTIVE|COMPLETED|CANCELLED|DELETED`)")
    }

    override def write(obj: PartOrderStatus): JsValue = JsString(obj.toString)
  }

  implicit def ptagtype = new JsonFormat[TagType] {
    override def read(json: JsValue): TagType = json match {
      case JsString("S") => TagType.S
      case JsString("W") => TagType.W
      case _ => throw new DeserializationException("expected TagType (one of `S|W`)")
    }

    override def write(obj: TagType): JsValue = JsString(obj.toString)
  }

  implicit def pdrawingtype = new JsonFormat[DrawingType] {
    override def read(json: JsValue): DrawingType = json match {
      case JsString("DETAIL") => DrawingType.DETAIL
      case JsString("LAYOUT") => DrawingType.LAYOUT
      case _ => throw new DeserializationException("expected DrawingType (one of `DETAIL|LAYOUT`)")
    }

    override def write(obj: DrawingType): JsValue = JsString(obj.toString)
  }

  implicit def pjobprefix = new JsonFormat[JobPrefix] {
    override def read(json: JsValue): JobPrefix = json match {
      case JsString("B") => JobPrefix.B
      case JsString("F") => JobPrefix.F
      case JsString("FC") => JobPrefix.FC
      case JsString("FE") => JobPrefix.FE
      case JsString("FR") => JobPrefix.FR
      case JsString("FS") => JobPrefix.FS
      case JsString("M") => JobPrefix.M
      case JsString("MF") => JobPrefix.MF
      case JsString("MT") => JobPrefix.MT
      case JsString("RG") => JobPrefix.RG
      case _ => throw new DeserializationException("expected JobPrefix (one of `B|F|FC|FE|FR|FS|M|MF|MT|RG`)")
    }

    override def write(obj: JobPrefix): JsValue = JsString(obj.toString)
  }

  implicit def pjobstatus = new JsonFormat[JobStatus] {
    override def read(json: JsValue): JobStatus = json match {
      case JsString("DRAFT") => JobStatus.DRAFT
      case JsString("ACTIVE") => JobStatus.ACTIVE
      case JsString("COMPLETED") => JobStatus.COMPLETED
      case JsString("CANCELLED") => JobStatus.CANCELLED
      case JsString("DELETED") => JobStatus.DELETED
      case _ => throw new DeserializationException("expected JobStatus (one of `DRAFT|ACTIVE|COMPLETED|CANCELLED|DELETED`)")
    }

    override def write(obj: JobStatus): JsValue = JsString(obj.toString)
  }

  implicit def pzone = jsonFormat4(Zone)

  implicit def pshippingitemzone = jsonFormat3(ShippingItemZone)

  implicit def pshippingitem = jsonFormat7(ShippingItem)

  implicit def pshipmentitem = jsonFormat3(ShipmentItem)

  implicit def pshipment = jsonFormat11(Shipment)

  implicit def ppart = jsonFormat4(Part)

  implicit def ppartorder = jsonFormat15(PartOrder)

  implicit def pmark = jsonFormat5(Mark)

  implicit def pdrawing = jsonFormat12(Drawing)

  implicit def pjobaddresses = jsonFormat2(JobAddresses)

  implicit def pschedule = jsonFormat3(Schedule)

  implicit def pjobschedules = jsonFormat5(JobSchedules)

  implicit def pjobid = jsonFormat3(JobId)

  implicit def prevision = jsonFormat5(Revision)

  implicit def pshippinggroupitem = jsonFormat3(ShippingGroupItem)

  implicit def pshippinggroup = jsonFormat6(ShippingGroup)

  implicit def pjob = jsonFormat19(Job)

}