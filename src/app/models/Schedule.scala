package app.models

import java.sql.Date

case class Schedule(pk: Option[Int],
                    startDate: Date,
                    completeDate: Date)