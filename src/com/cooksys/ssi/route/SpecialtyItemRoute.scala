package com.cooksys.ssi.route

import com.cooksys.ssi.model.schema.SpecialtyItem
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.routing.Route

import scala.concurrent.{ExecutionContext, Future}

class SpecialtyItemRoute(implicit val db: Database, ec: ExecutionContext) extends BaseRoute with SpecialtyItem.Implicits {

  override def internal: Route =
    pathPrefix("specialty-items") {
      pathEndOrSingleSlash {
        get {
          index
        } ~ post {
          entity(as[SpecialtyItem.Create]) { specialtyItem =>
            create(specialtyItem)
          }
        }
      } ~ pathPrefix(IntNumber) { id: Int =>
        pathEndOrSingleSlash {
          get {
            single(id)
          } ~ patch {
            entity(as[SpecialtyItem.Update]) { specialtyItem =>
              update(id, specialtyItem)
            }
          } ~ delete {
            destroy(id)
          }
        }
      }
    }

  def index: Future[SpecialtyItem.Index] =
    db.run(
      for (specialtyItems <- SpecialtyItems.result)
        yield SpecialtyItem.Index(
          specialtyItems.map(s => s: SpecialtyItem)
        )
    )

  def single(id: Int): Future[SpecialtyItem.Result] =
    db.run(
      for (option <- SpecialtyItems.filter(_.id === id).result.headOption)
        yield SpecialtyItem.Result(
          option.isDefined,
          option.map(s => s: SpecialtyItem),
          None,
          None,
          if (option.isDefined) None
          else Some(s"SpecialtyItem with id=$id does not exist")
        )
    )

  def create(specialtyItem: SpecialtyItem.Create): Future[SpecialtyItem.Result] =
    db.run(
      for {
        id <- (SpecialtyItems returning SpecialtyItems.map(_.id)) += specialtyItem
        option <- SpecialtyItems.filter(_.id === id).result.headOption
      }
        yield SpecialtyItem.Result(
          option.isDefined,
          option.map(s => s: SpecialtyItem),
          None,
          None,
          if (option.isDefined) None
          else Some(s"SpecialtyItem could not be created")
        )
    )

  def update(id: Int, specialtyItem: SpecialtyItem.Update): Future[SpecialtyItem.Result] =
    db.run(
      for {
        before <- SpecialtyItems.filter(_.id === id).result.headOption
        rows <- SpecialtyItems.filter(_.id === id).map(_.label).update(specialtyItem.label)
        after <- SpecialtyItems.filter(_.id === id).result.headOption
      }
        yield SpecialtyItem.Result(
          rows != 0,
          None,
          before.map(s => s: SpecialtyItem),
          after.map(s => s: SpecialtyItem),
          if(rows != 0) None else Some(s"SpecialtyItem with id=$id does not exist")
        )
    )

  def destroy(id: Int): Future[SpecialtyItem.Result] =
    db.run(
      for {
        before <- SpecialtyItems.filter(_.id === id).result.headOption
        rows <- SpecialtyItems.filter(_.id === id).delete
      }
        yield SpecialtyItem.Result(
          rows != 0,
          before.map(s => s: SpecialtyItem),
          None,
          None,
          if(rows != 0) None else Some(s"SpecialtyItem with id=$id does not exist")
        )
    )

}
