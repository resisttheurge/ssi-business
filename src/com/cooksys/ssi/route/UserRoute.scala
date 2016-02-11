package com.cooksys.ssi.route

import akka.http.scaladsl.server.Route
import com.cooksys.ssi.model.schema.User
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._

import scala.concurrent.{ExecutionContext, Future}

class UserRoute(implicit val db: Database, ec: ExecutionContext) extends BaseRoute with User.Implicits {

  override def internal: Route =
    pathPrefix("users") {
      pathEndOrSingleSlash {
        get {
          index
        } ~ post {
          entity(as[User.Create]) { user =>
            create(user)
          }
        }
      } ~ pathPrefix(IntNumber) { id: Int =>
        pathEndOrSingleSlash {
          get {
            single(id)
          } ~ patch {
            entity(as[User.Update]) { user =>
              update(id, user)
            }
          } ~ delete {
            destroy(id)
          }
        }
      }
    }

  def index: Future[User.Index] =
    db.run(
      for {
        users <- Users.withRoles.result
      } yield User.Index(User.aggregate(users).map(_.copy(password = None)))
    )

  def single(id: Int): Future[User.Result] =
    db.run(
      for {
        seq <- Users.byId(id).withRoles.result
      } yield {
        val option = User.aggregate(seq).headOption
        User.Result(
          option.isDefined,
          option.map(u => (u: User).copy(password = None)),
          None,
          None,
          if (option.isDefined) None
          else Some(s"User with id=$id does not exist")
        )
      }
    )

  def create(user: User.Create): Future[User.Result] =
    db.run(
      for {
        id <- (Users returning Users.map(_.id)) += user
        roleCreates <- createRoles(id, user.roles.getOrElse(Seq.empty))
        seq <- Users.byId(id).withRoles.result
      }
        yield {
          val option = User.aggregate(seq).headOption
          User.Result(
            option.isDefined,
            option.map(u => (u: User).copy(password = None)),
            None,
            None,
            if (option.isDefined) None
            else Some(s"User could not be created")
          )
        }
    )

  def update(id: Int, user: User.Update): Future[User.Result] =
    db.run(
      for {
        before <- Users.byId(id).withRoles.result
        rows <- Users.byId(id).update(user)
        roleUpdate <- updateRoles(id, user.roles.getOrElse(Seq.empty))
        after <- Users.byId(id).withRoles.result
      }
        yield User.Result(
          rows != 0,
          None,
          User.aggregate(before).headOption.map(u => u.copy(password = None)),
          User.aggregate(after).headOption.map(u => u.copy(password = None)),
          if (rows != 0) None else Some(s"User with id=$id does not exist")
        )
    )

  def destroy(id: Int): Future[User.Result] =
    db.run(
      for {
        before <- Users.byId(id).withRoles.result
        rows <- Users.filter(_.id === id).delete
      }
        yield User.Result(
          rows != 0,
          User.aggregate(before).headOption.map(u => u.copy(password = None)),
          None,
          None,
          if (rows != 0) None else Some(s"User with id=$id does not exist")
        )
    )

  def createRoles(id: Int, roles: Seq[String])(implicit ec: ExecutionContext) =
    UserRoles ++= roles.map(role => UserRolesRow(id, role, active = true))

  def updateRoles(id: Int, roles: Seq[String])(implicit ec: ExecutionContext) =
    for {
      existing <- UserRoles.byUserId(id).map(_.role).result
      created <- UserRoles ++= roles.diff(existing).map(role => UserRolesRow(id, role, active = true))
      activated <- UserRoles.inactive.byUserId(id).byRoles(roles).map(_.active).update(true)
      deactivated <- UserRoles.active.byUserId(id).filterNot(_.role inSet roles).map(_.active).update(false)
    } yield {
      (created, activated, deactivated)
    }

}
