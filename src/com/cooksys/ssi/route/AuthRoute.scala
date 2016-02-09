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
        results <- Users.byCredentials(credentials).withRoles.result
      } yield {
        val option = aggregate(results).headOption
        Authorization(
          success = option.isDefined,
          option.map(_.username),
          option.map(_.roles),
          if (option.isEmpty) Some("Username or password is incorrect") else None
        )
      }
    )

  def aggregate(userRoles: Seq[(UsersRow, Option[UserRolesRow])]): Seq[User] =
    userRoles
      .map {
        case (user, opt) =>
          if (opt.isDefined) (user: User).copy(roles = Seq(opt.get.role))
          else user: User
      }
      .foldLeft(Seq.empty[User])(
        (seq: Seq[User], user: User) =>
          if (seq.nonEmpty && seq.exists(_.id == user.id))
            seq.map {
              case u if u.id == user.id => u.copy(roles = u.roles ++ user.roles)
              case u => u
            }
          else seq :+ user
      )

}
