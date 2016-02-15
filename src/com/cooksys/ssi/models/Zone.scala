package com.cooksys.ssi.models

import java.sql.Date

case class Zone(id: Option[Int],
                jobId: Int,
                number: Int,
                fieldDate: Option[Date])
