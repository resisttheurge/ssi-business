package com.cooksys.ssi.routes

import akka.http.scaladsl.server.Route
import com.cooksys.ssi.dao.UserDao
import com.cooksys.ssi.models._
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._

import scala.concurrent.ExecutionContext

case class AuthRoute(path: String)(implicit val db: Database, ec: ExecutionContext) extends BaseRoute {

  override def internal: Route =
    pathPrefix(path) {
      pathEndOrSingleSlash {
        post {
          entity(as[Credentials]) { credentials =>
            UserDao.authorize(credentials)
          }
        }
      }
    }

}
