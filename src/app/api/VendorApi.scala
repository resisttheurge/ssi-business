package app.api
import akka.actor.ActorRefFactory
import app.models._
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.json._
import spray.routing._
import lib.util.syntax.all._

case class VendorApi()(implicit val actorRefFactory: ActorRefFactory, val db: Database, val ec: EC) extends HttpService with Directives {

  import JsonProtocol._

  val vendors = TableQuery[Vendors]

  def getById(id: Rep[Int]) = vendors.filter(_.id === id)

  def index = db.run(vendors.sortBy(_.label.asc).result).map(_.map(c => c: Vendor))

  def find(id: Int) = db.run(getById(id).result.head).map(c => c: Vendor)

  def create(vendor: Vendor) = db.run(
    vendors
      returning vendors.map(_.id)
      into ((vendor, id) => (vendor: Vendor).copy(pk = Some(id)))
      += vendor
  )

  def update(id: Int)(vendor: Vendor) = db.run(getById(id).map(_.label).update(vendor.label))

  def destroy(id: Int) = db.run(getById(id).delete)

  def route: Route =
    pathPrefix("vendors") {
      pathEndOrSingleSlash {
        get {
          onSuccess(index) { vendors: Seq[Vendor] =>
            complete(
              JsObject("vendors" -> JsArray(vendors.map(_.toJson).toVector))
            )
          }
        } ~ post {
          entity(as[Vendor]) { vendor: Vendor =>
            onSuccess(create(vendor)) { (created: Vendor) =>
              complete(created)
            }
          }

        }
      } ~ path(IntNumber) { id: Int =>
        get {
          onSuccess(find(id)) { (vendor: Vendor) =>
            complete(vendor)
          }
        } ~ patch {
          entity(as[Vendor]) { vendor: Vendor =>
            onSuccess(update(id)(vendor)) { (rowsChanged: Int) =>
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

