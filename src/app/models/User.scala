package app.models

case class User(pk: Int,
                username: String,
                password: String,
                active: Boolean)

object User {
  case class Create(username: String, password: String, active: Option[Boolean])



  sealed trait Find
  case class Index(active: Option[Boolean] = Some(true)) extends Find
  case class ByUsername(username: String, active: Option[Boolean] = Some(true)) extends Find
  case class ByPk(pk: Int, active: Option[Boolean] = Some(true)) extends Find

}