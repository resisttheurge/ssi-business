package app.api
import akka.actor.ActorRefFactory
import app.models._
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.json._
import spray.routing._
import lib.util.syntax.all._

case class PartApi()(implicit val actorRefFactory: ActorRefFactory, val db: Database, val ec: EC) extends HttpService with Directives {

  import JsonProtocol._

  val parts = TableQuery[Parts]

  def getById(id: Rep[Int]) = parts.filter(_.id === id)

  def index = db.run(parts.sortBy(_.number.asc).result).map(_.map(c => c: Part))

  def find(id: Int) = db.run(getById(id).result.head).map(c => c: Part)

  def create(part: Part) = db.run(
    parts
      returning parts.map(_.id)
      into ((part, id) => (part: Part).copy(pk = Some(id)))
      += part
  )

  def update(id: Int)(part: Part) = db.run(getById(id).update(part))

  def destroy(id: Int) = db.run(getById(id).delete)

  def route: Route =
    pathPrefix("parts") {
      pathEndOrSingleSlash {
        get {
          onSuccess(index) { parts: Seq[Part] =>
            complete(
              JsObject("parts" -> JsArray(parts.map(_.toJson).toVector))
            )
          }
        } ~ post {
          entity(as[Part]) { part: Part =>
            onSuccess(create(part)) { (created: Part) =>
              complete(created)
            }
          }

        }
      } ~ path(IntNumber) { id: Int =>
        get {
          onSuccess(find(id)) { (part: Part) =>
            complete(part)
          }
        } ~ patch {
          entity(as[Part]) { part: Part =>
            onSuccess(update(id)(part)) { (rowsChanged: Int) =>
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

