package app.api

import akka.actor.ActorRefFactory
import app.models._
import slick.driver.MySQLDriver.api._
import app.db.Queries._
import spray.routing._
import lib.util.syntax.all._

case class JobApi()(implicit val actorRefFactory: ActorRefFactory, val db: Database, val ec: EC) extends HttpService with Directives {

  import JsonProtocol._

  def route =
    pathPrefix("jobs") {
      pathEndOrSingleSlash {
        get {
          complete("jobs index")
        } ~ post {
          complete("create job")
        }
      } ~ pathPrefix(IntNumber) { pk: Int =>
        pathEndOrSingleSlash {
          get {
            onSuccess(db.run(jobs.findById(pk).result)) {
              r => complete(r.toString)
            }
          } ~ patch {
            complete(s"update job $pk")
          } ~ delete {
            complete(s"delete job $pk")
          }
        } ~
          DrawingApi(pk).route ~
          ShippingGroupApi(pk).route ~
          PartOrderApi(pk).route ~
          ShipmentApi(pk).route ~
          ZoneApi(pk).route
      }
    }

}
