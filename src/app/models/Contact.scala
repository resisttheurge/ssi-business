package app.models

case class Contact(pk: Option[Int],
                   label: String,
                   phone: String,
                   fax: String,
                   email: String)
