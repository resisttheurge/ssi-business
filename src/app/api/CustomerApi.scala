package app.api
import akka.actor.ActorRefFactory
import app.models._
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.json._
import spray.routing._
import lib.util.syntax.all._

class CustomerApi(implicit val actorRefFactory: ActorRefFactory, val db: Database, val ec: EC) extends HttpService with Directives {

  import JsonProtocol._

  val customers = TableQuery[Customers]

  def getById(id: Rep[Int]) = customers.filter(_.id === id)

  def index = db.run(customers.sortBy(_.label.asc).result).map(_.map(c => c: Customer))

  def find(id: Int) = db.run(getById(id).result.head).map(c => c: Customer)

  def create(customer: Customer) = db.run(
    customers
      returning customers.map(_.id)
      into ((customer, id) => (customer: Customer).copy(pk = Some(id)))
      += customer
  )

  def update(id: Int)(customer: Customer) = db.run(getById(id).map(_.label).update(customer.label))

  def destroy(id: Int) = db.run(getById(id).delete)

  def route: Route =
    pathPrefix("customers") {
      pathEndOrSingleSlash {
        get {
          onSuccess(index) { customers: Seq[Customer] =>
            complete(
              JsObject("customers" -> JsArray(customers.map(_.toJson).toVector))
            )
          }
        } ~ post {
          entity(as[Customer]) { customer: Customer =>
            onSuccess(create(customer)) { (created: Customer) =>
              complete(created)
            }
          }

        }
      } ~ path(IntNumber) { id: Int =>
        get {
          onSuccess(find(id)) { (customer: Customer) =>
            complete(customer)
          }
        } ~ patch {
          entity(as[Customer]) { customer: Customer =>
            onSuccess(update(id)(customer)) { (rowsChanged: Int) =>
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

