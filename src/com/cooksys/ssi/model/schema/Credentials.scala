package com.cooksys.ssi.model.schema

import spray.json.DefaultJsonProtocol

case class Credentials(username: String, password: String)

object Credentials {

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends DefaultJsonProtocol {
    implicit val `JSON Credentials` = jsonFormat2(Credentials.apply)
  }

}