package com.cooksys.ssi.routes

import akka.http.scaladsl.server.Route
import akka.http.scaladsl.server.directives.ParameterDirectives
import com.cooksys.ssi.dao._
import com.cooksys.ssi.models.{JobPrefix, SystemType, JobAddresses}
import slick.driver.MySQLDriver.api._

import scala.concurrent.ExecutionContext

case class InnerJobsRoute(implicit val db: Database, val ec: ExecutionContext) extends BaseRoute {
  import ParameterDirectives.ParamMagnet
  override def internal: Route =
    get {
      parameters('active.?, 'prefix.?) { (active: Option[String], prefix: Option[String]) =>
        JobDao.filteredIndex(active.map(a => java.lang.Boolean.valueOf(a)), prefix.map(p => p: JobPrefix))
      }
    }
}
