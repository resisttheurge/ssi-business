package com.cooksys.ssi.route

import com.cooksys.ssi.model.schema.Part
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.routing.Route

import scala.concurrent.{ExecutionContext, Future}

class PartRoute(implicit val db: Database, ec: ExecutionContext) extends BaseRoute with Part.Implicits {

  override def internal: Route =
    pathPrefix("parts") {
      pathEndOrSingleSlash {
        get {
          index
        } ~ post {
          entity(as[Part.Create]) { part =>
            create(part)
          }
        }
      } ~ pathPrefix(IntNumber) { id: Int =>
        pathEndOrSingleSlash {
          get {
            single(id)
          } ~ patch {
            entity(as[Part.Update]) { part =>
              update(id, part)
            }
          } ~ delete {
            destroy(id)
          }
        }
      }
    }

  def index: Future[Part.Index] =
    db.run(
      for (parts <- Parts.result)
        yield Part.Index(
          parts.map(p => p: Part)
        )
    )

  def single(id: Int): Future[Part.Result] =
    db.run(
      for (option <- Parts.filter(_.id === id).result.headOption)
        yield Part.Result(
          option.isDefined,
          option.map(p => p: Part),
          None,
          None,
          if (option.isDefined) None
          else Some(s"Part with id=$id does not exist")
        )
    )

  def create(part: Part.Create): Future[Part.Result] =
    db.run(
      for {
        id <- (Parts returning Parts.map(_.id)) += part
        option <- Parts.filter(_.id === id).result.headOption
      }
        yield Part.Result(
          option.isDefined,
          option.map(p => p: Part),
          None,
          None,
          if (option.isDefined) None
          else Some(s"Part could not be created")
        )
    )

  def update(id: Int, part: Part.Update): Future[Part.Result] =
    db.run(
      for {
        before <- Parts.filter(_.id === id).result.headOption
        rows <- Parts.filter(_.id === id).map(p => (p.`type`, p.number, p.description)).update((part.partType, part.number, part.description))
        after <- Parts.filter(_.id === id).result.headOption
      }
        yield Part.Result(
          rows != 0,
          None,
          before.map(p => p: Part),
          after.map(p => p: Part),
          if(rows != 0) None else Some(s"Part with id=$id does not exist")
        )
    )

  def destroy(id: Int): Future[Part.Result] =
    db.run(
      for {
        before <- Parts.filter(_.id === id).result.headOption
        rows <- Parts.filter(_.id === id).delete
      }
        yield Part.Result(
          rows != 0,
          before.map(p => p: Part),
          None,
          None,
          if(rows != 0) None else Some(s"Part with id=$id does not exist")
        )
    )

}
