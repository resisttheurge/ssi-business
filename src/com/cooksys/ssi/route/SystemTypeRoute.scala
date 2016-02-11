package com.cooksys.ssi.route

import akka.http.scaladsl.server.Route
import com.cooksys.ssi.model.schema.SystemType
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._

import scala.concurrent.{ExecutionContext, Future}

class SystemTypeRoute(implicit val db: Database, ec: ExecutionContext) extends BaseRoute with SystemType.Implicits {

  override def internal: Route =
    pathPrefix("system-types") {
      pathEndOrSingleSlash {
        get {
          index
        } ~ post {
          entity(as[SystemType.Create]) { systemType =>
            create(systemType)
          }
        }
      } ~ pathPrefix(IntNumber) { id: Int =>
        pathEndOrSingleSlash {
          get {
            single(id)
          } ~ patch {
            entity(as[SystemType.Update]) { systemType =>
              update(id, systemType)
            }
          } ~ delete {
            destroy(id)
          }
        }
      }
    }

  def index: Future[SystemType.Index] =
    db.run(
      for (systemTypes <- SystemTypes.result)
        yield SystemType.Index(
          systemTypes.map(s => s: SystemType)
        )
    )

  def single(id: Int): Future[SystemType.Result] =
    db.run(
      for (option <- SystemTypes.filter(_.id === id).result.headOption)
        yield SystemType.Result(
          option.isDefined,
          option.map(s => s: SystemType),
          None,
          None,
          if (option.isDefined) None
          else Some(s"SystemType with id=$id does not exist")
        )
    )

  def create(systemType: SystemType.Create): Future[SystemType.Result] =
    db.run(
      for {
        id <- (SystemTypes returning SystemTypes.map(_.id)) += systemType
        option <- SystemTypes.filter(_.id === id).result.headOption
      }
        yield SystemType.Result(
          option.isDefined,
          option.map(s => s: SystemType),
          None,
          None,
          if (option.isDefined) None
          else Some(s"SystemType could not be created")
        )
    )

  def update(id: Int, systemType: SystemType.Update): Future[SystemType.Result] =
    db.run(
      for {
        before <- SystemTypes.filter(_.id === id).result.headOption
        rows <- SystemTypes.filter(_.id === id).map(_.label).update(systemType.label)
        after <- SystemTypes.filter(_.id === id).result.headOption
      }
        yield SystemType.Result(
          rows != 0,
          None,
          before.map(s => s: SystemType),
          after.map(s => s: SystemType),
          if(rows != 0) None else Some(s"SystemType with id=$id does not exist")
        )
    )

  def destroy(id: Int): Future[SystemType.Result] =
    db.run(
      for {
        before <- SystemTypes.filter(_.id === id).result.headOption
        rows <- SystemTypes.filter(_.id === id).delete
      }
        yield SystemType.Result(
          rows != 0,
          before.map(s => s: SystemType),
          None,
          None,
          if(rows != 0) None else Some(s"SystemType with id=$id does not exist")
        )
    )

}
