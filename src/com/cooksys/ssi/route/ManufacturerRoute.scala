package com.cooksys.ssi.route

import com.cooksys.ssi.model.schema.Manufacturer
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.routing.Route

import scala.concurrent.{ExecutionContext, Future}

class ManufacturerRoute(implicit val db: Database, ec: ExecutionContext) extends BaseRoute with Manufacturer.Implicits {

  override def internal: Route =
    pathPrefix("manufacturers") {
      pathEndOrSingleSlash {
        get {
          index
        } ~ post {
          entity(as[Manufacturer.Create]) { manufacturer =>
            create(manufacturer)
          }
        }
      } ~ path(IntNumber) { id: Int =>
        get {
          single(id)
        } ~ patch {
          entity(as[Manufacturer.Update]) { manufacturer =>
            update(id, manufacturer)
          }
        } ~ delete {
          destroy(id)
        }
      }
    }

  def index: Future[Manufacturer.Index] =
    db.run(
      for (manufacturers <- Manufacturers.result)
        yield Manufacturer.Index(
          manufacturers.map(m => m: Manufacturer)
        )
    )

  def single(id: Int): Future[Manufacturer.Result] =
    db.run(
      for (option <- Manufacturers.filter(_.id === id).result.headOption)
        yield Manufacturer.Result(
          option.isDefined,
          option.map(m => m: Manufacturer),
          if (option.isDefined) None
          else Some(s"Manufacturer with id=$id does not exist")
        )
    )

  def create(manufacturer: Manufacturer.Create): Future[Manufacturer.Result] =
    db.run(
      for {
        id <- (Manufacturers returning Manufacturers.map(_.id)) += Manufacturer(None, manufacturer.label)
        option <- Manufacturers.filter(_.id === id).result.headOption
      }
        yield Manufacturer.Result(
          option.isDefined,
          option.map(m => m: Manufacturer),
          if (option.isDefined) None
          else Some(s"Manufacturer could not be created")
        )
    )

  def update(id: Int, manufacturer: Manufacturer.Update): Future[Manufacturer.Result] =
    db.run(
      for {
        rows <- Manufacturers.filter(_.id === id).map(_.label).update(manufacturer.label)
        after <- Manufacturers.filter(_.id === id).result.headOption
      }
        yield Manufacturer.Result(
          rows != 0,
          after.map(m => m: Manufacturer),
          if(rows != 0) None else Some(s"Manufacturer with id=$id does not exist")
        )
    )

  def destroy(id: Int): Future[Manufacturer.Result] =
    db.run(
      for {
        before <- Manufacturers.filter(_.id === id).result.headOption
        rows <- Manufacturers.filter(_.id === id).delete
      }
        yield Manufacturer.Result(
          rows != 0,
          before.map(m => m: Manufacturer),
          if(rows != 0) None else Some(s"Manufacturer with id=$id does not exist")
        )
    )

}
