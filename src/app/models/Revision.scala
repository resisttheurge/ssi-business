package app.models

import java.sql.Timestamp

case class Revision(pk: Option[Int],
                    jobPk: Int,
                    label: String,
                    description: String,
                    created: Timestamp)
