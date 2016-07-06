package com.cooksys.ssi.utils.conversions

import com.cooksys.ssi.models._

object EnumConversions extends EnumConversions

trait EnumConversions {

  implicit def fromDrawingType(x: DrawingType): String = x.toString

  implicit def toDrawingType(x: String): DrawingType =
    x match {
      case "DETAIL" => DrawingType.DETAIL
      case "LAYOUT" => DrawingType.LAYOUT
      case "VOID" => DrawingType.VOID
    }


  implicit def fromJobAddressType(x: JobAddressType): String = x.toString

  implicit def toJobAddressType(x: String): JobAddressType =
    x match {
      case "SHIPPING" => JobAddressType.SHIPPING
      case "INVOICING" => JobAddressType.INVOICING
    }

  implicit def fromJobPrefix(x: JobPrefix): String = x.toString

  implicit def toJobPrefix(x: String): JobPrefix =
    x match {
      case "B" => JobPrefix.B
      case "F" => JobPrefix.F
      case "FC" => JobPrefix.FC
      case "FE" => JobPrefix.FE
      case "FR" => JobPrefix.FR
      case "FS" => JobPrefix.FS
      case "M" => JobPrefix.M
      case "MF" => JobPrefix.MF
      case "MT" => JobPrefix.MT
      case "RG" => JobPrefix.RG
      case "BM" => JobPrefix.BM
      case "LM" => JobPrefix.LM
      case "MM" => JobPrefix.MM
      case "D" => JobPrefix.D
      case "G" => JobPrefix.G
      case "DR" => JobPrefix.DR
      case "EE" => JobPrefix.EE
      case "ME" => JobPrefix.ME
      case "MS" => JobPrefix.MS
      case "TM" => JobPrefix.TM
    }

  implicit def fromJobStatus(x: JobStatus): String = x.toString

  implicit def toJobStatus(x: String): JobStatus =
    x match {
      case "INACTIVE" => JobStatus.INACTIVE
      case "ACTIVE" => JobStatus.ACTIVE
      case "COMPLETED" => JobStatus.COMPLETED
      case "CANCELLED" => JobStatus.CANCELLED
      case "DELETED" => JobStatus.DELETED
    }

  implicit def fromPartOrderStatus(x: PartOrderStatus): String = x.toString

  implicit def toPartOrderStatus(x: String): PartOrderStatus =
    x match {
      case "ACTIVE" => PartOrderStatus.ACTIVE
      case "COMPLETED" => PartOrderStatus.COMPLETED
      case "CANCELLED" => PartOrderStatus.CANCELLED
      case "DELETED" => PartOrderStatus.DELETED
    }

  implicit def fromPartType(x: PartType): String = x.toString

  implicit def toPartType(x: String): PartType =
    x match {
      case "MECH" => PartType.MECH
      case "ELEC" => PartType.ELEC
    }

  implicit def fromScheduleType(x: ScheduleType): String = x.toString

  implicit def toScheduleType(x: String): ScheduleType =
    x match {
      case "ENGINEERING" => ScheduleType.ENGINEERING
      case "MECHANICAL" => ScheduleType.MECHANICAL
      case "ELECTRICAL" => ScheduleType.ELECTRICAL
      case "SHIPPING" => ScheduleType.SHIPPING
      case "INSTALLATION" => ScheduleType.INSTALLATION
    }

  implicit def fromShippingItemStatus(x: ShippingItemStatus): String = x.toString

  implicit def toShippingItemStatus(x: String): ShippingItemStatus =
    x match {
      case "FAB" => ShippingItemStatus.FAB
      case "FTS" => ShippingItemStatus.FTS
      case "HOLD" => ShippingItemStatus.HOLD
      case "MACH" => ShippingItemStatus.MACH
      case "MEM" => ShippingItemStatus.MEM
      case "MOO" => ShippingItemStatus.MOO
      case "NEXT" => ShippingItemStatus.NEXT
      case "NS" => ShippingItemStatus.NS
      case "PAINT" => ShippingItemStatus.PAINT
      case "PREFAB" => ShippingItemStatus.PREFAB
      case "REWORK" => ShippingItemStatus.REWORK
      case "RTA" => ShippingItemStatus.RTA
      case "RTP" => ShippingItemStatus.RTP
      case "RTS" => ShippingItemStatus.RTS
      case "SAMPLE" => ShippingItemStatus.SAMPLE
      case "SHPD" => ShippingItemStatus.SHPD
      case "SIP" => ShippingItemStatus.SIP
      case "VOID" => ShippingItemStatus.VOID
      case "W.O.REV." => ShippingItemStatus.`W.O.REV.`
      case "WP" => ShippingItemStatus.WP
    }

  implicit def fromTagType(x: TagType): String = x.toString

  implicit def toTagType(x: String): TagType =
    x match {
      case "S" => TagType.S
      case "W" => TagType.W
    }

  implicit def fromUserRoleType(x: UserRoleType): String = x.toString

  implicit def toUserRoleType(x: String): UserRoleType =
    x match {
      case "ADMIN" => UserRoleType.ADMIN
      case "EMPLOYEE" => UserRoleType.EMPLOYEE
    }

  implicit def fromShipmentStatus(x: ShipmentStatus): String = x.toString

  implicit def toShipmentStatus(x: String): ShipmentStatus =
    x match {
      case "ACTIVE" => ShipmentStatus.ACTIVE
      case "POSTED" => ShipmentStatus.POSTED
      case "COMPLETED" => ShipmentStatus.COMPLETED
      case "CANCELLED" => ShipmentStatus.CANCELLED
      case "DELETED" => ShipmentStatus.DELETED
    }
  
}
