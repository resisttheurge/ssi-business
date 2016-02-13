package com.cooksys.ssi.models

import java.sql.Date

case class Schedule(id: Option[Int],
                    jobId: Int,
                    scheduleType: String,
                    startDate: Option[Date],
                    completeDate: Option[Date])
