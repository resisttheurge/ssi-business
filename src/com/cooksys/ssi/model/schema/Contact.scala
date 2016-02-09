package com.cooksys.ssi.model.schema

import slick.schema.Tables.ContactsRow
import spray.json.DefaultJsonProtocol

case class Contact(id: Option[Int], label: Option[String], phone: Option[String], fax: Option[String], email: Option[String])

object Contact {

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def toContactsRow(contact: Contact): ContactsRow =
      ContactsRow(
        id = contact.id.getOrElse(-1),
        label = contact.label,
        phone = contact.phone,
        fax = contact.fax,
        email = contact.email
      )

    implicit def fromContactsRow(row: ContactsRow): Contact =
      Contact(
        id = Some(row.id),
        label = row.label,
        phone = row.phone,
        fax = row.fax,
        email = row.email
      )


  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends RootJsonProtocol {

    implicit val `JSON Contact` = jsonFormat5(Contact.apply)

  }

}