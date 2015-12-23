package app.api
import akka.actor.ActorRefFactory
import app.models._
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.json._
import spray.routing._
import lib.util.syntax.all._

case class SalespersonApi()(implicit val actorRefFactory: ActorRefFactory, val db: Database, val ec: EC) extends HttpService with Directives {

  import JsonProtocol._

  val salespeople = TableQuery[Salespeople]

  def getById(id: Rep[Int]) = salespeople.filter(_.id === id)

  def index = db.run(salespeople.sortBy(_.label.asc).result).map(_.map(c => c: Salesperson))

  def find(id: Int) = db.run(getById(id).result.head).map(c => c: Salesperson)

  def create(salesperson: Salesperson) = db.run(
    salespeople
      returning salespeople.map(_.id)
      into ((salesperson, id) => (salesperson: Salesperson).copy(pk = Some(id)))
      += salesperson
  )

  def update(id: Int)(salesperson: Salesperson) = db.run(getById(id).map(_.label).update(salesperson.label))

  def destroy(id: Int) = db.run(getById(id).delete)

  def route: Route =
    pathPrefix("salespeople") {
      pathEndOrSingleSlash {
        get {
          onSuccess(index) { salespeople: Seq[Salesperson] =>
            complete(
              JsObject("salespeople" -> JsArray(salespeople.map(_.toJson).toVector))
            )
          }
        } ~ post {
          entity(as[Salesperson]) { salesperson: Salesperson =>
            onSuccess(create(salesperson)) { (created: Salesperson) =>
              complete(created)
            }
          }

        }
      } ~ path(IntNumber) { id: Int =>
        get {
          onSuccess(find(id)) { (salesperson: Salesperson) =>
            complete(salesperson)
          }
        } ~ patch {
          entity(as[Salesperson]) { salesperson: Salesperson =>
            onSuccess(update(id)(salesperson)) { (rowsChanged: Int) =>
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

