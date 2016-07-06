package com.cooksys.ssi.models

case class Contact(id: Option[Int],
                   label: Option[String],
                   phone: Option[String],
                   fax: Option[String],
                   email: Option[String])