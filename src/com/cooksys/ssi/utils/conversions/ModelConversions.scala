package com.cooksys.ssi.utils.conversions

import com.cooksys.ssi.models._

object ModelConversions extends ModelConversions
trait ModelConversions {

  implicit def toJobAddresses(map: Map[JobAddressType, Address]): JobAddresses =
    JobAddresses(
      shipping = map.get(JobAddressType.SHIPPING),
      invoicing = map.get(JobAddressType.INVOICING)
    )

  implicit def toJobSchedules(map: Map[ScheduleType, Schedule]): JobSchedules =
    JobSchedules(
      engineering = map.get(ScheduleType.ENGINEERING),
      mechanical = map.get(ScheduleType.MECHANICAL),
      electrical = map.get(ScheduleType.ELECTRICAL),
      shipping = map.get(ScheduleType.SHIPPING),
      installation = map.get(ScheduleType.INSTALLATION)
    )

}
