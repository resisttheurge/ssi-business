package com.cooksys.ssi.models

case class JobSchedules(engineering: Option[Schedule],
                        mechanical: Option[Schedule],
                        electrical: Option[Schedule],
                        shipping: Option[Schedule],
                        installation: Option[Schedule])
