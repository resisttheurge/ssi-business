package com.cooksys.ssi.model.schema

import spray.json.DefaultJsonProtocol

case class Authorization(success: Boolean, username: Option[String], roles: Option[Seq[String]], message: Option[String])

object Authorization {

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol

  trait JsonProtocol extends RootJsonProtocol {
    implicit val `JSON Authorization` = jsonFormat4(Authorization.apply)
  }

}
