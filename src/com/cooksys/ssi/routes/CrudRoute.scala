package com.cooksys.ssi.routes

import akka.http.scaladsl.server.Route
import com.cooksys.ssi.dao.CrudDao
import slick.driver.MySQLDriver.api._
import spray.json.RootJsonFormat

import scala.concurrent.ExecutionContext

case class CrudRoute[Model: RootJsonFormat](path: String,
                                            dao: CrudDao[Model],
                                            inner: Option[Route] = None,
                                            innerWithId: Option[Int => Route] = None)
                                           (implicit db: Database, ec: ExecutionContext)
  extends BaseRoute {

  override def internal = crudRoute

  def crudRoute =
    pathPrefix(path) {
      pathEndOrSingleSlash {
        get {
          dao.index
        } ~ post {
          entity(as[Model]) { model =>
            dao.create(model)
          }
        }
      } ~ pathPrefix(IntNumber) { id: Int =>
        pathEndOrSingleSlash {
          get {
            dao.read(id)
          } ~ patch {
            entity(as[Model]) { model =>
              dao.update(id, model)
            }
          } ~ delete {
            dao.destroy(id)
          }
        }
      }
    }

  def innerRoute =
    inner match {
      case Some(route) => route
      case _ => reject
    }

  def innerRouteWithId(id: Int) =
    innerWithId match {
      case Some(f) => f(id)
      case _ => reject
    }

}
