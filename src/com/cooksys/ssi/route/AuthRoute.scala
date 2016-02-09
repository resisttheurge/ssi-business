package com.cooksys.ssi.route

import com.cooksys.ssi.model.schema.{Authorization, User, Credentials, Carrier}
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.routing.Route

import scala.concurrent.{ExecutionContext, Future}

class AuthRoute(implicit val db: Database, ec: ExecutionContext)
  extends BaseRoute
    with User.Implicits
    with Credentials.Implicits
    with Authorization.Implicits {

  override def internal: Route =
    pathPrefix("authenticate") {
      pathEndOrSingleSlash {
        post {
          entity(as[Credentials]) { credentials =>
            authorize(credentials)
          }
        }
      }
    }

  def authorize(credentials: Credentials): Future[Authorization] =
    db.run(
      for {
        results <- Users.active.byCredentials(credentials).withRoles.result
      } yield {
        val option = User.aggregate(results).headOption
        Authorization(
          success = option.isDefined,
          option.map(_.username),
          option.flatMap(_.roles),
          if (option.isEmpty) Some("Username or password is incorrect") else None
        )
      }
    )

}
