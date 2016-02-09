package com.cooksys.ssi.model.schema

import java.sql.Date
import java.util.Base64

case class Report(title: String, data: String)

object Report {

  case class LayoutDrawing(jobId: Int)
  case class DetailDrawing(jobId: Int)
  case class ComputerDrawing(jobId: Int)
  case class Zone(jobId: Int)
  case class MaterialShipper(jobId: Int)
  case class ShipVia(jobId: Int)
  case class Shipment(jobId: Int)
  case class ManagementReview(start: Date, end: Date)
  case class ProductionSchedule(weekEnding: Date)
  case class SpecialtyItemsByJob(jobId: Int)
  case class SpecialtyItemsByPartType(partType: String)
  case class ShippingGroupShipper(jobId: Int, shippingGroupId: Int)
  case class JobShipment(shipmentId: Int)

  object Implicits extends Implicits

  trait Implicits extends JsonProtocol {

    implicit def byteArrayToBase64String(data: Array[Byte]): String =
      Base64.getMimeEncoder.encodeToString(data)

  }

  object JsonProtocol extends JsonProtocol

  trait JsonProtocol extends RootJsonProtocol {

    implicit val `JSON Report` = jsonFormat2(Report.apply)

    implicit val `JSON LayoutDrawing` = jsonFormat1(LayoutDrawing)
    implicit val `JSON DetailDrawing` = jsonFormat1(DetailDrawing)
    implicit val `JSON ComputerDrawing` = jsonFormat1(ComputerDrawing)
    implicit val `JSON Zone` = jsonFormat1(Zone)
    implicit val `JSON MaterialShipper` = jsonFormat1(MaterialShipper)
    implicit val `JSON ShipVia` = jsonFormat1(ShipVia)
    implicit val `JSON Shipment` = jsonFormat1(Shipment)
    implicit val `JSON ManagementReview` = jsonFormat2(ManagementReview)
    implicit val `JSON ProductionSchedule` = jsonFormat1(ProductionSchedule)
    implicit val `JSON SpecialtyItemsByJob` = jsonFormat1(SpecialtyItemsByJob)
    implicit val `JSON SpecialtyItemsByPartType` = jsonFormat1(SpecialtyItemsByPartType)
    implicit val `JSON ShippingGroupShipper` = jsonFormat2(ShippingGroupShipper)
    implicit val `JSON JobShipment` = jsonFormat1(JobShipment)

  }

}
