package com.cooksys.ssi.model.schema

import java.sql.{Timestamp, Date}

import spray.json._

object RootJsonProtocol extends RootJsonProtocol

trait RootJsonProtocol extends DefaultJsonProtocol {

  implicit object SqlDateFormatter extends JsonFormat[Date] {
    override def write(obj: Date): JsValue = JsString(obj.toString)

    override def read(json: JsValue): Date = json match {
      case JsString(x) =>
        try {
          Date.valueOf(x)
        } catch {
          case t: IllegalArgumentException =>
            deserializationError("Expected Date with format `yyyy-[m]m-[d]d`, but got " + x, t)
        }
      case x => deserializationError("Expected Date as JsString, but got " + x)
    }
  }

  implicit object SqlTimestampFormatter extends JsonFormat[Timestamp] {
    override def write(obj: Timestamp): JsValue = JsString(obj.toString)

    override def read(json: JsValue): Timestamp = json match {
      case JsString(x) =>
        try {
          Timestamp.valueOf(x)
        } catch {
          case t: IllegalArgumentException =>
            deserializationError("Expected Timestamp with format `yyyy-[m]m-[d]d hh:mm:ss[.f...]`, but got " + x, t)
        }
      case x => deserializationError("Expected Timestamp as JsString, but got " + x)
    }
  }

}


