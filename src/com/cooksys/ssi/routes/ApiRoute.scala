package com.cooksys.ssi.routes

import akka.http.scaladsl.model.headers._
import com.cooksys.ssi.dao._
import slick.driver.MySQLDriver.api._

import scala.concurrent.ExecutionContext

case class ApiRoute(path: String)(implicit db: Database, ec: ExecutionContext) extends BaseRoute with CorsSupport {
  override def internal =
    cors {
      pathPrefix(path) {
        CrudRoute("addenda", AddendumDao) ~
          CrudRoute("addresses", AddressDao) ~
          AuthRoute("auth") ~
          CrudRoute("carriers", CarrierDao) ~
          CrudRoute("contacts", ContactDao) ~
          CrudRoute("customers", CustomerDao) ~
          CrudRoute("drawings", DrawingDao, innerWithId = (id: Int) => InnerDrawingRoute(id)) ~
          CrudRoute("jobs", JobDao, InnerJobsRoute(), innerWithId = (id: Int) => InnerJobRoute(id)) ~
          CrudRoute("manufacturers", ManufacturerDao) ~
          CrudRoute("marks", MarkDao) ~
          CrudRoute("part-orders", PartOrderDao) ~
          CrudRoute("parts", PartDao) ~
          ReportRoute("reports") ~
          CrudRoute("salespeople", SalespersonDao) ~
          CrudRoute("schedules", ScheduleDao) ~
          CrudRoute("shipments", ShipmentDao, innerWithId = (id: Int) => InnerShipmentRoute(id)) ~
          CrudRoute("shipment-items", ShipmentItemDao) ~
          CrudRoute("shipping-groups", ShippingGroupDao, innerWithId = (id: Int) => InnerShippingGroupRoute(id)) ~
          CrudRoute("shipping-group-items", ShippingGroupItemDao) ~
          CrudRoute("shipping-items", ShippingItemDao, innerWithId = (id: Int) => InnerShippingItemRoute(id)) ~
          CrudRoute("shipping-item-zones", ShippingItemZoneDao) ~
          CrudRoute("shops", ShopDao) ~
          CrudRoute("specialty-items", SpecialtyItemDao) ~
          CrudRoute("system-types", SystemTypeDao) ~
          CrudRoute("users", UserDao) ~
          CrudRoute("vendors", VendorDao) ~
          CrudRoute("zones", ZoneDao)
      }
    }
}
