package app.api

import akka.actor.ActorRefFactory
import app.models._
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.json._
import spray.routing._
import lib.util.syntax.all._

case class ZoneApi(jobPk: Int)(implicit val actorRefFactory: ActorRefFactory, val db: Database, val ec: EC) extends HttpService with Directives {

  val zones = TableQuery[Zones]

  def route: Route =
    pathPrefix("zones") {
      pathEndOrSingleSlash {
        get {
          complete(s"job $jobPk zones index")
        }
      }
    }

}
