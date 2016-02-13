package com.cooksys.ssi.models

import slick.schema.Tables._
import slick.driver.MySQLDriver.api._
import spray.json.DefaultJsonProtocol

import scala.concurrent.ExecutionContext

case class User(id: Option[Int],
                username: String,
                password: Option[String],
                active: Option[Boolean],
                roles: Option[Seq[String]] = None)