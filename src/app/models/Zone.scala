package app.models

import java.sql.Date

case class Zone(pk: Option[Int],
                jobPk: Int,
                number: Int,
                fieldDate: Option[Date])
