package app.api

import akka.actor.ActorRefFactory
import app.models._
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.json._
import spray.routing._
import lib.util.syntax.all._

case class JobApi()(implicit val actorRefFactory: ActorRefFactory, val db: Database, val ec: EC) extends HttpService with Directives {

  import JsonProtocol._

  val jobs = TableQuery[Jobs]

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
            complete(s"job $pk")
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
