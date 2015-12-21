package app.api
import akka.actor.ActorRefFactory
import app.models._
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.json._
import spray.routing._
import lib.util.syntax.all._

class ShopApi(implicit val actorRefFactory: ActorRefFactory, val db: Database, val ec: EC) extends HttpService with Directives {

  import JsonProtocol._

  val shops = TableQuery[Shops]

  def getById(id: Rep[Int]) = shops.filter(_.id === id)

  def index = db.run(shops.sortBy(_.label.asc).result).map(_.map(c => c: Shop))

  def find(id: Int) = db.run(getById(id).result.head).map(c => c: Shop)

  def create(shop: Shop) = db.run(
    shops
      returning shops.map(_.id)
      into ((shop, id) => (shop: Shop).copy(pk = Some(id)))
      += shop
  )

  def update(id: Int)(shop: Shop) = db.run(getById(id).map(_.label).update(shop.label))

  def destroy(id: Int) = db.run(getById(id).delete)

  def route: Route =
    pathPrefix("shops") {
      pathEndOrSingleSlash {
        get {
          onSuccess(index) { shops: Seq[Shop] =>
            complete(
              JsObject("shops" -> JsArray(shops.map(_.toJson).toVector))
            )
          }
        } ~ post {
          entity(as[Shop]) { shop: Shop =>
            onSuccess(create(shop)) { (created: Shop) =>
              complete(created)
            }
          }

        }
      } ~ path(IntNumber) { id: Int =>
        get {
          onSuccess(find(id)) { (shop: Shop) =>
            complete(shop)
          }
        } ~ patch {
          entity(as[Shop]) { shop: Shop =>
            onSuccess(update(id)(shop)) { (rowsChanged: Int) =>
              complete(
                JsObject(
                  "success" -> JsBoolean(rowsChanged == 1)
                )
              )
            }
          }
        } ~ delete {
          onSuccess(destroy(id)) { (rowsChanged: Int) =>
            complete(
              JsObject(
                "success" -> JsBoolean(rowsChanged == 1)
              )
            )
          }
        }
      }
    }

}

