package com.cooksys.ssi.models

import java.sql.Timestamp

case class Addendum(id: Option[Int],
                    jobId: Int,
                    label: String,
                    description: String,
                    contractPrice: Option[BigDecimal],
                    salesperson: Option[Salesperson] = None,
                    contact: Option[Contact] = None,
                    created: Option[Timestamp])