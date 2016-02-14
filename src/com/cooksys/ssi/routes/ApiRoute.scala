package com.cooksys.ssi.routes

import com.cooksys.ssi.dao._
import slick.driver.MySQLDriver.api._

import scala.concurrent.ExecutionContext

case class ApiRoute(path: String)(implicit db: Database, ec: ExecutionContext) extends BaseRoute {
  override def internal =
    pathPrefix("api") {
      AuthRoute("auth") ~
        ReportRoute("reports") ~
        CrudRoute("carriers", CarrierDao) ~
        CrudRoute("jobs", JobDao) ~
        CrudRoute("manufacturers", ManufacturerDao) ~
        CrudRoute("parts", PartDao) ~
        CrudRoute("salespeople", SalespersonDao) ~
        CrudRoute("shops", ShopDao) ~
        CrudRoute("specialty-items", SpecialtyItemDao) ~
        CrudRoute("system-types", SystemTypeDao) ~
        CrudRoute("users", UserDao) ~
        CrudRoute("vendors", VendorDao)
    }
}
