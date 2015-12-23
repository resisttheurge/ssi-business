package app.api

import akka.actor.ActorRefFactory
import app.models._
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.json._
import spray.routing._
import lib.util.syntax.all._

case class ShippingGroupApi(jobPk: Int)(implicit val actorRefFactory: ActorRefFactory, val db: Database, val ec: EC) extends HttpService with Directives {

  def route: Route =
    pathPrefix("shipping-groups") {
      pathEndOrSingleSlash {
        get {
          complete(s"job $jobPk shipping-groups index")
        }
      }
    }

}
