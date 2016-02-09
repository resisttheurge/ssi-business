package com.cooksys.ssi.route

import com.cooksys.ssi.model.schema.User
import slick.driver.MySQLDriver.api._
import slick.schema.Tables._
import spray.routing.Route

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
      } yield User.Index(aggregate(users))
    )

  def single(id: Int): Future[User.Result] =
    db.run(
      for {
        seq <- Users.byId(id).withRoles.result
      } yield {
        val option = aggregate(seq).headOption
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
        seq <- Users.byId(id).withRoles.result
      }
        yield {
          val option = aggregate(seq).headOption
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
        after <- Users.byId(id).withRoles.result
      }
        yield User.Result(
          rows != 0,
          None,
          aggregate(before).headOption.map(u => u.copy(password = None)),
          aggregate(after).headOption.map(u => u.copy(password = None)),
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
          aggregate(before).headOption.map(u => u.copy(password = None)),
          None,
          None,
          if (rows != 0) None else Some(s"User with id=$id does not exist")
        )
    )

  /*
   * turns flat (UsersRow, UserRolesRow) query results into a list of User objects with seq's of roles nested within
   */
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
