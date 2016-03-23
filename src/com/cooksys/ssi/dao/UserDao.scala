package com.cooksys.ssi.dao

import com.cooksys.ssi.models._
import slick.schema.Tables._
import com.cooksys.ssi.utils.crypto.BCrypt

object UserDao extends CrudDao[User] {

  def authorize(credentials: Credentials)(implicit dB: DB, eC: EC) =
    run(authorizeAction(credentials))

  def authorizeAction(credentials: Credentials)(implicit ec: EC) =
    for {
      results <- Users.active.byCredentials(credentials).withRoles.result
    } yield {
      val option = aggregate(results).headOption
      val success = option.isDefined && BCrypt.checkpw(credentials.password, option.get.password)
      Response[Authorization](
        success = success,
        message = if (!success) Some("Username or password is incorrect") else None,
        data = option.map(
          opt =>
            Authorization(
              opt.username,
              opt.roles
            )
        )
      )
    }

  override def indexAction(implicit ec: EC) =
    for {
      users <- Users.withRoles.result
    } yield {
      Response[Seq[User]](
        success = true,
        data = aggregate(users).map(_.copy(password = None))
      )
    }

  override def readAction(id: Int)(implicit ec: EC) =
    for {
      seq <- Users.byId(id).withRoles.result
    } yield {
      val option = aggregate(seq).headOption
      Response[User](
        success = option.isDefined,
        data = option.map(_.copy(password = None)),
        message =
          if (option.isDefined) None
          else Some(s"User with id=$id does not exist")
      )
    }

  override def createAction(user: User)(implicit ec: EC) =
    for {
      id <- (Users returning Users.map(_.id)) += user.copy(password = Option(BCrypt.hashpw(user.password.get, BCrypt.gensalt())))
      roleCreates <- createRoles(id, user.roles.getOrElse(Seq.empty))
      seq <- Users.byId(id).withRoles.result
    } yield {
        val option = aggregate(seq).headOption
        Response[User](
          success = option.isDefined,
          data = option.map(u => (u: User).copy(password = None)),
          message =
            if (option.isDefined) None
            else Some(s"User could not be created")
        )
      }

  override def updateAction(id: Int, user: User)(implicit ec: EC) =
    for {
      before <- Users.byId(id).withRoles.result
      rows <- Users.byId(id).update(user)
      roleUpdate <- updateRoles(id, user.roles.getOrElse(Seq.empty))
      after <- Users.byId(id).withRoles.result
    } yield {
        Response[Updated[User]](
          success = rows != 0,
          message =
            if (rows != 0) None
            else Some(s"User with id=$id does not exist"),
          data = Updated[User](
            before = aggregate(before).headOption.map(_.copy(password = None)),
            after = aggregate(after).headOption.map(_.copy(password = None))
          )
        )
      }

  override def destroyAction(id: Int)(implicit ec: EC) =
    for {
      before <- Users.byId(id).withRoles.result
      rows <- Users.filter(_.id === id).delete
    } yield {
      Response[User](
        success = rows != 0,
        message =
          if (rows != 0) None
          else Some(s"User with id=$id does not exist"),
        data = aggregate(before).headOption.map(u => u.copy(password = None))
      )
    }

  def createRoles(id: Int, roles: Seq[UserRoleType])(implicit ec: EC) =
    UserRoles ++= roles.map(role => UserRolesRow(id, role, active = true))

  def updateRoles(id: Int, roles: Seq[UserRoleType])(implicit ec: EC) =
    for {
      existing <- UserRoles.byUserId(id).map(_.role).result
      created <- UserRoles ++= roles.diff(existing).map(role => UserRolesRow(id, role, active = true))
      activated <- UserRoles.inactive.byUserId(id).byRoles(roles).map(_.active).update(true)
      deactivated <- UserRoles.active.byUserId(id).filterNot(_.role inSet roles.map(r => r: String)).map(_.active).update(false)
    } yield {
      (created, activated, deactivated)
    }

  def aggregate(userRoles: Seq[(UsersRow, Option[UserRolesRow])]): Seq[User] =
    userRoles
      .map {
        case (user, opt) =>
          if (opt.isDefined) (user: User).copy(roles = Some(Seq(opt.get.role)))
          else user: User
      }
      .foldLeft(Seq.empty[User])(
        (seq: Seq[User], user: User) =>
          if (seq.nonEmpty && seq.exists(_.id == user.id))
            seq.map {
              case u if u.id == user.id =>
                (u.roles, user.roles) match {
                  case (Some(r1), Some(r2)) => u.copy(roles = Some(r1 ++ r2))
                  case (Some(r1), None) => u
                  case (None, Some(r2)) => user
                  case (None, None) => u
                }
              case u => u
            }
          else seq :+ user
      )
}
