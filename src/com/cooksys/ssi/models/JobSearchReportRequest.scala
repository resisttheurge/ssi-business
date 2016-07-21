package com.cooksys.ssi.models

import java.sql.Date

case class JobSearchReportRequest(start: Option[Date],
                                  end: Option[Date],
                                  prefix: String,
                                  year: String,
                                  label: String,
                                  city: String,
                                  state: String,
                                  customer: String,
                                  description: String)
