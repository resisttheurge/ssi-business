package app.models

case class User(pk: Option[Int],
                username: String,
                password: String,
                active: Option[Boolean])