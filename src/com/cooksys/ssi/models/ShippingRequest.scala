package com.cooksys.ssi.models

import java.sql.Date

case class ShippingRequest(id: Option[Int] = None,
                           tagType: Option[TagType] = None,
                           title: Option[String] = None,
                           revision: Option[String] = None,
                           revisionDate: Option[Date] = None,
                           startDate: Option[Date] = None,
                           shopDate: Option[Date] = None,
                           fieldDate: Option[Date] = None,
                           requestDate: Option[Date] = None,
                           requestedBy: Option[String] = None,
                           preparedBy: Option[String] = None,
                           filePath: Option[String] = None,
                           shop: Option[Shop] = None,
                           carrier: Option[Carrier] = None,
                           contact: Option[Contact] = None,
                           address: Option[Address] = None)
