package com.cooksys.ssi.routes

import com.cooksys.ssi.dao._
import slick.driver.MySQLDriver.api._

import scala.concurrent.ExecutionContext

case class ApiRoute(path: String)(implicit db: Database, ec: ExecutionContext) extends BaseRoute {
  override def internal =
    pathPrefix("api") {
      CrudRoute("addresses", AddressDao) ~
        AuthRoute("auth") ~
        CrudRoute("carriers", CarrierDao) ~
        CrudRoute("drawings", DrawingDao) ~
        CrudRoute("jobs", JobDao, innerWithId = (id: Int) => InnerJobRoute(id)) ~
        CrudRoute("manufacturers", ManufacturerDao) ~
        CrudRoute("parts", PartDao) ~
        ReportRoute("reports") ~
        CrudRoute("salespeople", SalespersonDao) ~
        CrudRoute("schedules", ScheduleDao)
        CrudRoute("shipping-groups", ShippingGroupDao) ~
        CrudRoute("shops", ShopDao) ~
        CrudRoute("specialty-items", SpecialtyItemDao) ~
        CrudRoute("system-types", SystemTypeDao) ~
        CrudRoute("users", UserDao) ~
        CrudRoute("vendors", VendorDao)
    }
}
