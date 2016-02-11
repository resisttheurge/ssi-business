package com.cooksys.ssi.route

import akka.http.scaladsl.server.Route
import com.cooksys.ssi.model.schema.Shop
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._

import scala.concurrent.{ExecutionContext, Future}

class ShopRoute(implicit val db: Database, ec: ExecutionContext) extends BaseRoute with Shop.Implicits {

  override def internal: Route =
    pathPrefix("shops") {
      pathEndOrSingleSlash {
        get {
          index
        } ~ post {
          entity(as[Shop.Create]) { shop =>
            create(shop)
          }
        }
      } ~ pathPrefix(IntNumber) { id: Int =>
        pathEndOrSingleSlash {
          get {
            single(id)
          } ~ patch {
            entity(as[Shop.Update]) { shop =>
              update(id, shop)
            }
          } ~ delete {
            destroy(id)
          }
        }
      }
    }

  def index: Future[Shop.Index] =
    db.run(
      for (shops <- Shops.result)
        yield Shop.Index(
          shops.map(s => s: Shop)
        )
    )

  def single(id: Int): Future[Shop.Result] =
    db.run(
      for (option <- Shops.filter(_.id === id).result.headOption)
        yield Shop.Result(
          option.isDefined,
          option.map(s => s: Shop),
          None,
          None,
          if (option.isDefined) None
          else Some(s"Shop with id=$id does not exist")
        )
    )

  def create(shop: Shop.Create): Future[Shop.Result] =
    db.run(
      for {
        id <- (Shops returning Shops.map(_.id)) += shop
        option <- Shops.filter(_.id === id).result.headOption
      }
        yield Shop.Result(
          option.isDefined,
          option.map(s => s: Shop),
          None,
          None,
          if (option.isDefined) None
          else Some(s"Shop could not be created")
        )
    )

  def update(id: Int, shop: Shop.Update): Future[Shop.Result] =
    db.run(
      for {
        before <- Shops.filter(_.id === id).result.headOption
        rows <- Shops.filter(_.id === id).map(_.label).update(shop.label)
        after <- Shops.filter(_.id === id).result.headOption
      }
        yield Shop.Result(
          rows != 0,
          None,
          before.map(s => s: Shop),
          after.map(s => s: Shop),
          if(rows != 0) None else Some(s"Shop with id=$id does not exist")
        )
    )

  def destroy(id: Int): Future[Shop.Result] =
    db.run(
      for {
        before <- Shops.filter(_.id === id).result.headOption
        rows <- Shops.filter(_.id === id).delete
      }
        yield Shop.Result(
          rows != 0,
          before.map(s => s: Shop),
          None,
          None,
          if(rows != 0) None else Some(s"Shop with id=$id does not exist")
        )
    )

}
