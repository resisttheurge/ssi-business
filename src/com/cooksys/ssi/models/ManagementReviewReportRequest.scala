package com.cooksys.ssi.models

import java.sql.Date

case class ManagementReviewReportRequest(start: Date, end: Date, prefix: String, year: Int, label: String, city: String, state: String, customer: String)
