package com.cooksys.ssi.utils.conversions

import com.cooksys.ssi.models._

object EnumConversions extends EnumConversions

trait EnumConversions {

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

  implicit def fromUserRoleType(x: UserRoleType): String = x.toString

  implicit def toUserRoleType(x: String): UserRoleType =
    x match {
      case "ADMIN" => UserRoleType.ADMIN
      case "EMPLOYEE" => UserRoleType.EMPLOYEE
    }

}
