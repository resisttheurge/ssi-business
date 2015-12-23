package app.api

import akka.actor.ActorRefFactory
import app.models._
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.json._
import spray.routing._
import lib.util.syntax.all._

case class CarrierApi()(implicit val actorRefFactory: ActorRefFactory, val db: Database, val ec: EC) extends HttpService with Directives {

  import JsonProtocol._

  val carriers = TableQuery[Carriers]

  def getById(id: Rep[Int]) = carriers.filter(_.id === id)

  def index = db.run(carriers.sortBy(_.label.asc).result).map(_.map(c => c: Carrier))

  def find(id: Int) = db.run(getById(id).result.head).map(c => c: Carrier)

  def create(carrier: Carrier) = db.run(
    carriers
      returning carriers.map(_.id)
      into ((carrier, id) => (carrier: Carrier).copy(pk = Some(id)))
      += carrier
  )

  def update(id: Int)(carrier: Carrier) = db.run(getById(id).map(_.label).update(carrier.label))

  def destroy(id: Int) = db.run(getById(id).delete)

  def route: Route =
    pathPrefix("carriers") {
      pathEndOrSingleSlash {
        get {
          onSuccess(index) { carriers: Seq[Carrier] =>
            complete(
              JsObject("carriers" -> JsArray(carriers.map(_.toJson).toVector))
            )
          }
        } ~ post {
          entity(as[Carrier]) { carrier: Carrier =>
            onSuccess(create(carrier)) { (created: Carrier) =>
              complete(created)
            }
          }

        }
      } ~ path(IntNumber) { id: Int =>
        get {
          onSuccess(find(id)) { (carrier: Carrier) =>
            complete(carrier)
          }
        } ~ patch {
          entity(as[Carrier]) { carrier: Carrier =>
            onSuccess(update(id)(carrier)) { (rowsChanged: Int) =>
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
