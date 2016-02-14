package com.cooksys.ssi.models

import slick.schema.Tables.PartsRow
import spray.json.DefaultJsonProtocol

case class Part(id: Option[Int],
                partType: String,
                number: Option[String],
                description: Option[String])