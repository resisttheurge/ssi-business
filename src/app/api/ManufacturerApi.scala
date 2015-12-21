package app.api
import akka.actor.ActorRefFactory
import app.models._
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.json._
import spray.routing._
import lib.util.syntax.all._

class ManufacturerApi(implicit val actorRefFactory: ActorRefFactory, val db: Database, val ec: EC) extends HttpService with Directives {

  import JsonProtocol._

  val manufacturers = TableQuery[Manufacturers]

  def getById(id: Rep[Int]) = manufacturers.filter(_.id === id)

  def index = db.run(manufacturers.sortBy(_.label.asc).result).map(_.map(c => c: Manufacturer))

  def find(id: Int) = db.run(getById(id).result.head).map(c => c: Manufacturer)

  def create(manufacturer: Manufacturer) = db.run(
    manufacturers
      returning manufacturers.map(_.id)
      into ((manufacturer, id) => (manufacturer: Manufacturer).copy(pk = Some(id)))
      += manufacturer
  )

  def update(id: Int)(manufacturer: Manufacturer) = db.run(getById(id).map(_.label).update(manufacturer.label))

  def destroy(id: Int) = db.run(getById(id).delete)

  def route: Route =
    pathPrefix("manufacturers") {
      pathEndOrSingleSlash {
        get {
          onSuccess(index) { manufacturers: Seq[Manufacturer] =>
            complete(
              JsObject("manufacturers" -> JsArray(manufacturers.map(_.toJson).toVector))
            )
          }
        } ~ post {
          entity(as[Manufacturer]) { manufacturer: Manufacturer =>
            onSuccess(create(manufacturer)) { (created: Manufacturer) =>
              complete(created)
            }
          }

        }
      } ~ path(IntNumber) { id: Int =>
        get {
          onSuccess(find(id)) { (manufacturer: Manufacturer) =>
            complete(manufacturer)
          }
        } ~ patch {
          entity(as[Manufacturer]) { manufacturer: Manufacturer =>
            onSuccess(update(id)(manufacturer)) { (rowsChanged: Int) =>
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

